import { Router } from "express";
import crypto from "crypto";

type OrderItem = {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
};

type Shipping = {
  fullName: string;
  phone: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  notes?: string;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "fulfilled";
  shipping: Shipping;
  createdAt: string;
};

const orders: Order[] = [];
const router = Router();

router.get("/", (req, res) => {
  const email = (req.query.email as string | undefined)?.toLowerCase();
  const filtered = email
    ? orders.filter(order => order.shipping.email.toLowerCase() === email)
    : orders;
  res.json({ orders: filtered });
});

router.post("/", (req, res) => {
  const { items, shipping } = req.body ?? {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty." });
  }

  const requiredFields = [
    "fullName",
    "phone",
    "email",
    "address1",
    "city",
    "state",
    "postal",
    "country",
  ];
  for (const field of requiredFields) {
    if (!shipping?.[field]) {
      return res.status(400).json({ message: "Missing shipping details." });
    }
  }

  const total = items.reduce(
    (sum: number, item: OrderItem) => sum + item.price * item.quantity,
    0
  );

  const order: Order = {
    id: crypto.randomUUID(),
    items,
    total,
    status: "pending",
    shipping,
    createdAt: new Date().toISOString(),
  };

  orders.unshift(order);
  return res.status(201).json({ order });
});

export { orders };
export default router;
