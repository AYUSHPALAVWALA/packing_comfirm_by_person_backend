import mongoose from "mongoose";
import dns from "dns";
import usersModel from "../modules/user/user.model.js";
import bcrypt from "bcrypt";

// Overriding default DNS servers to fix querySrv ECONNREFUSED that happens on some local networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// create async function to connect database here
async function connectDB() {
  try {
    //create databse connection Instance here are store in connectionInstance variable
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    //in console print mongoDB connected with their database name
    console.log(
      `MongoDB Connected With Database Name Is ${connectionInstance.connection.name}`,
    );

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
    console.log("MongoDB Connection Failed :", error.message);
    process.exit(1);
  }
}

export default connectDB; // call in server.mjs
