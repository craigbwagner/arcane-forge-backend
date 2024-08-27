import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Character, CharacterModel } from "../models/user";

interface CharacterDocument extends Character {
  _id: ObjectId;
  }

async function index(req: Request, res: Response){
  try {
    const characters: CharacterDocument[] = await CharacterModel.find();
    res.status(200).json(characters);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
}

async function create(req: Request, res: Response){
  try {
    const character: CharacterDocument = await CharacterModel.create(req.body);
    res.status(201).json(character);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
}

async function update(req: Request, res: Response) {
  try {
    const character: CharacterDocument | null = await CharacterModel.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Character not found." });
    } else {
      const updatedCharacter: CharacterDocument | null = await CharacterModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

  export default { index, create, update };
