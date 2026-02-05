import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";

/* -------------------- */
/*  EXTEND REQUEST TYPE */
/* -------------------- */
export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
  name?: string;
  isAdmin?: boolean;
}

/* -------------------- */
/*  AUTH MIDDLEWARE     */
/* -------------------- */
export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: "Missing CLERK_SECRET_KEY" });
    }

    const token = authHeader.replace("Bearer ", "");

    const payload = await clerkClient.verifyToken(token);

    // ✅ Attach user info to request
    req.userId = payload.sub;
    req.email = typeof payload.email === "string" ? payload.email : "";
    req.name = typeof payload.name === "string" ? payload.name : "";
    req.isAdmin = false;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
