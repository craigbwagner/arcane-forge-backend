import { Request, Response } from "express";
import { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const SALT_LENGTH = 12;

interface IUser {
  username: string;
  password: string;
  _id?: Types.ObjectId;
  characters: Types.ObjectId[];
};

async function signUp(req:Request, res: Response) {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(400).json({ error: "Username already taken." });
    }
    const user: IUser = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, SALT_LENGTH),
    });
    const token: string = generateToken(user);
    res.status(201).json({ username: user.username, id: user._id, token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const user: IUser | null = await User.findOne({ username: req.body.username }).populate( "characters");
    console.log("user after populate:", user)
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}

function generateToken(user: UserDocument): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }
  if (!user) {
    throw new Error("User is not defined.");
  }
  const token: string = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
  return token;
}

export default { signUp, signIn };
