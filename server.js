import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

// Attempt an initial connection (useful for local dev)
// The middleware in app.js ensures it connects for Vercel Requests
connectDB().catch(console.error);

// Vercel doesn't need app.listen() - it injects req/res directly into the exported app.
// We only listen on a port if we are running locally.
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port : http://localhost:${PORT}`);
  });
}

// Crucial: Export the app for Vercel's Serverless runtime
export default app;
