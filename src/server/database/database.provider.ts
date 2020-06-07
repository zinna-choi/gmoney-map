import mongoose, { Mongoose } from "mongoose";

let cachedDb = null;

export const databaseProvider = async (): Promise<Mongoose> => {
  console.log("Load DatabaseProvider");

  if (cachedDb) {
    console.log("Cache DB");
    return cachedDb;
  }

  try {
    const connection = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      // readPreference: "primary",
      // ssl: false,
      useUnifiedTopology: true,
    });

    cachedDb = connection;
    return connection;
  } catch (e) {
    console.log("Database Load Failed....!");
  }
};
