import { Router } from "express";
import User from "../models/User";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/me", requireAuth, async (req: AuthRequest, res) => {
  if (!req.userId) {
    return res.status(400).json({ message: "User ID missing" });
  }

  let user = await User.findOne({ clerkId: req.userId });

  if (!user) {
    user = await User.create({
      clerkId: req.userId,
      email: req.email,
      name: req.name,
      isAdmin: req.isAdmin ?? false,
    });
  }

  return res.json(user); // ✅ IMPORTANT
});

export default router;
