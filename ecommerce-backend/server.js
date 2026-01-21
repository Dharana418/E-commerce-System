import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userroute from "./routes/userroute.js";
import productroute from "./routes/productroute.js";

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not set. Add it to your .env file (mongodb://127.0.0.1:27017/ecommerce)"
  );
}
app.use(express.json());
app.use(cors());
app.use("/api/users", userroute);
app.use("/api/products", productroute);
app.get("/", (req, res) => {
  res.status(200).send("E-commerce Backend is Running 🚀");
});

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully ✅");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error ❌", err.message);
    process.exit(1);
  }
};

start();
