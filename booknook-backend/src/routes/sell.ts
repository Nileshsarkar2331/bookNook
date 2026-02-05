import { Router } from "express";
import crypto from "crypto";

type Listing = {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  condition: "Like New" | "Good" | "Fair" | "Acceptable";
  category: string;
  description?: string;
  imageUrl?: string;
  sellerEmail: string;
  createdAt: string;
};

const listings: Listing[] = [];
const router = Router();

router.get("/", (_req, res) => {
  res.json({ listings });
});

router.post("/", (req, res) => {
  const {
    title,
    author,
    originalPrice,
    condition,
    category,
    description,
    imageUrl,
    sellerEmail,
  } = req.body ?? {};

  if (!title || !author || !originalPrice || !condition || !category || !sellerEmail) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const priceMap: Record<Listing["condition"], number> = {
    "Like New": 0.35,
    Good: 0.28,
    Fair: 0.23,
    Acceptable: 0.15,
  };

  const multiplier = priceMap[condition as Listing["condition"]];
  if (!multiplier) {
    return res.status(400).json({ message: "Invalid condition." });
  }

  const original = Number(originalPrice);
  if (!Number.isFinite(original) || original <= 0) {
    return res.status(400).json({ message: "Invalid original price." });
  }

  const computedPrice = Math.round(original * multiplier);

  const listing: Listing = {
    id: crypto.randomUUID(),
    title,
    author,
    price: computedPrice,
    originalPrice: original,
    condition,
    category,
    description,
    imageUrl,
    sellerEmail,
    createdAt: new Date().toISOString(),
  };

  listings.unshift(listing);
  return res.status(201).json({ listing });
});

export default router;
