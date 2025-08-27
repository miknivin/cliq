/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string | undefined =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI
    : process.env.MONGODBLIVE_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Extend NodeJS global type to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

// Initialize cached connection in global scope
const cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<Mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 8000, // Fail fast if server isn’t found (5s)
      connectTimeoutMS: 15000, // Max time to establish connection (10s)
    };

    console.log(
      "Attempting to connect to MongoDB with URI:",
      (MONGODB_URI ?? "").replace(/:([^:@]+)@/, ":****@")
    ); // Mask password

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((error: Error) => {
        console.error("MongoDB connection failed:", error.message);
        cached.promise = null; // Reset promise to allow retry
        throw error;
      });

    // Connection event listeners
    mongoose.connection.on("connected", () =>
      console.log("Mongoose connection established")
    );
    mongoose.connection.on("error", (err) =>
      console.error("Mongoose connection error:", err)
    );
    mongoose.connection.on("disconnected", () =>
      console.log("Mongoose disconnected")
    );
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: any) {
    console.error("Error in dbConnect:", error.message);
    throw error;
  }
}

export default dbConnect;
