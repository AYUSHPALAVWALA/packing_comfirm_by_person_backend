import mongoose from "mongoose";
import dns from "dns";
import usersModel from "../modules/user/user.model.js";
import bcrypt from "bcrypt";

// Overriding default DNS servers to fix querySrv ECONNREFUSED that happens on some local networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

let isConnected = false; // Track connection state for Serverless functions (Vercel)

async function connectDB() {
  if (isConnected) {
    return; // Use existing connection
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is missing!");
  }

  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    isConnected = connectionInstance.connections[0].readyState === 1;
    console.log(`MongoDB Connected With Database Name Is ${connectionInstance.connection.name}`);

    // Seed default admin account
    try {
      const adminExists = await usersModel.findOne({ email: "admin@admin.com" });
      if (!adminExists) {
        const hashedpassword = await bcrypt.hash("admin", 12);
        await usersModel.create({
          username: "admin",
          email: "admin@admin.com",
          password: hashedpassword,
          role: "admin"
        });
        console.log("-> Default Admin Created: admin@admin.com / admin");
      }
    } catch (seedError) {
      console.error("Error seeding admin:", seedError.message);
    }
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    throw error; // Let the request error out instead of crashing the lambda
  }
}

export default connectDB;
