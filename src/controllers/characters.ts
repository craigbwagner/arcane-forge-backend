import { Request, Response } from "express";
import { Character } from "../models/character";
import { User } from "../models/user";

async function index(req: Request, res: Response){
  try {
    const characters: typeof Character[] = await Character.find();
    res.status(200).json(characters);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
}

async function create(req: Request, res: Response){
  try {
    const characterData = req.body;
    delete characterData.user;
    const character = await Character.create(characterData);
    const user = await User.findById(req.body.creator)
    if(!user) {
      return res.status(404).json({ error: "User not found." })
    }
    user.characters.push(character._id)
    user.save()

    res.status(201).json(character);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
}

async function getCharacter(req: Request, res:Response) {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Character not found." })
    } else {
      res.status(200).json(character);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
}

async function update(req: Request, res: Response) {
  try {
    const character: typeof Character | null = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Character not found." });
    } else {
      const updatedCharacter: typeof Character | null = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCharacter) {
        return res.status(400).json({ error: "Failed to update character." });
      }
      res.status(200).json(updatedCharacter);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
}

async function destroy(req: Request, res: Response) {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Character not found." });
    } else {
      const user = await User.findById(character.creator)
      if(!user) {
        return res.status(404).json({ error: "User not found." })
      }
      user.characters = user.characters.filter(characterId => characterId === character._id)
      user.save();
      await Character.findByIdAndDelete(req.params.id);
      res.status(204).end();
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
}

  export default { index, create, getCharacter, update, destroy };
