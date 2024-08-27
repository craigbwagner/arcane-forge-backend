import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { characterSchema, Character } from "../models/user";

interface CharacterDocument extends Character {
  _id: ObjectId;
  }
