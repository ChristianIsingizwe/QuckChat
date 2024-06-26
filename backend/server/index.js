import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoute.js";

const app = express();

const port = process.env.PORT || 5000;

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err?.message);
  }
}

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

connectToMongoDB().then(() =>
  app.listen(port, () => {
    console.log(`Successfully started running on port ${port}`);
  })
);
