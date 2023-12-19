import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectToMongoDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
