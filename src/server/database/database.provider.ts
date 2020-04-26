import mongoose from "mongoose";
import process from "../../process";

export const databaseProvider = async () => {
  console.log("Load DatabaseProvider");

  try {
    await mongoose.connect(
      `mongodb://${process.MONGODB_HOST}:${process.MONGODB_PORT}/${process.MONGODB_DATABASE}`,
      {
        useNewUrlParser: true,
        readPreference: "primary",
        ssl: false,
        useUnifiedTopology: true,
      }
    );

    console.log("Database Load Success");
  } catch (e) {
    console.log("Database Load Failed....!");
  }
};
