import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "WebDev-Compiler",
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error in connecting Database");
  }
};
