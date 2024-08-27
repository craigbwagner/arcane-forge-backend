import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Character, CharacterModel } from "../models/user";

interface CharacterDocument extends Character {
  _id: ObjectId;
  }

async function index(req: Request, res: Response): Promise<void> {
  try {
    const characters: CharacterDocument[] = await CharacterModel.find();
    res.status(200).json(characters);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}

async function create(req: Request, res: Response): Promise<void> {
  try {
    const character: CharacterDocument = await CharacterModel.create(req.body);
    res.status(201).json(character);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}

  export default { index, create };
