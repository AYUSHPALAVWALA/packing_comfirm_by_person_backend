"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dns = _interopRequireDefault(require("dns"));
var _userModel = _interopRequireDefault(require("../modules/user/user.model.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Overriding default DNS servers to fix querySrv ECONNREFUSED that happens on some local networks
_dns.default.setServers(["8.8.8.8", "8.8.4.4"]);

// create async function to connect database here
async function connectDB() {
  try {
    //create databse connection Instance here are store in connectionInstance variable
    const connectionInstance = await _mongoose.default.connect(process.env.MONGODB_URI);
    //in console print mongoDB connected with their database name
    console.log(`MongoDB Connected With Database Name Is ${connectionInstance.connection.name}`);

    // Seed default admin account
    try {
      const adminExists = await _userModel.default.findOne({
        email: "admin@admin.com"
      });
      if (!adminExists) {
        const hashedpassword = await _bcrypt.default.hash("admin", 12);
        await _userModel.default.create({
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
var _default = exports.default = connectDB; // call in server.mjs