import { Router } from "express";
import { listings } from "./sell";
import { orders } from "./orders";

const router = Router();

router.get("/orders", (_req, res) => {
  res.json({ orders });
});

router.get("/users", (_req, res) => {
  const emails = new Set<string>();
  listings.forEach(listing => emails.add(listing.sellerEmail.toLowerCase()));
  orders.forEach(order => emails.add(order.shipping.email.toLowerCase()));

  const users = Array.from(emails).map((email, index) => ({
    id: `user-${index + 1}`,
    email,
    name: email.split("@")[0],
  }));

  res.json({ users });
});

export default router;
