import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

router.get("/protected", requireAuth, (req: AuthRequest, res) => {
  res.json({
    message: "✅ Protected route working",
    userId: req.userId,
  });
});

export default router;
