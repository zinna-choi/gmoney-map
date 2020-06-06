import mongoose, { Mongoose } from "mongoose";
import process from "../../process";

let cachedDb = null;

export const databaseProvider = async (): Promise<Mongoose> => {
  console.log("Load DatabaseProvider");

  if (cachedDb) {
    console.log("Cache DB");
    return cachedDb;
  }

  try {
    const connection = mongoose.connect(
      `mongodb://${process.MONGODB_HOST}:${process.MONGODB_PORT}/${process.MONGODB_DATABASE}`,
      {
        useNewUrlParser: true,
        readPreference: "primary",
        ssl: false,
        useUnifiedTopology: true,
      }
    );

    cachedDb = connection;
    return connection;
  } catch (e) {
    console.log("Database Load Failed....!");
  }
};
