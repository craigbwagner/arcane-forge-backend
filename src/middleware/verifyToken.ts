import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function verifyToken(req: Request, res: Response, next: NextFunction): void {
  try {
    if (!req.headers.authorization) {
      throw new Error("Authorization header is required.");
    }
    const token: string = req.headers.authorization.split(" ")[1];
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is required.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
    next();
  } catch (err: unknown) {
    res.status(401).json({ error: "Invalid token." });
  }
}
