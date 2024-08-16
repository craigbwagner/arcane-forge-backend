import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";

const SALT_LENGTH = 12;

async function signUp(req:Request, res: Response) {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(400).json({ error: "Username already taken." });
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, SALT_LENGTH),
    });
    const token: string = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function generateToken(user): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }
  const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
  return token;
}

export default { signUp, signIn };
