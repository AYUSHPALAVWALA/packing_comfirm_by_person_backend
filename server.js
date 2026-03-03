import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT;

// connectDB() called here, and database connect first, and then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port : http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection Failed :", error);
    process.exit(1);
  });
