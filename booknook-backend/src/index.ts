import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/test";
import sellRoutes from "./routes/sell";
import orderRoutes from "./routes/orders";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
