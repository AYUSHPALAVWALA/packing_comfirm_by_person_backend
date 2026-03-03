import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import packingRouters from "./modules/packing/packing.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import connectDB from "./config/db.js";

dotenv.config(); //for .env file

const app = express(); // create express server instance here are store in app variable

//middlewares
app.use(express.json()); //middleware use to parses incoming JSON requests and makes data available in req.body
app.use(express.urlencoded({ extended: true })); //middleware use to parses URL-encoded form data (HTML form submissions)
app.use(cookieParser());
// Forceful CORS Middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // If there is an origin, allow it explicitly (required for credentials: true)
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

    // Instantly respond to preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

// Vercel Serverless Database Connection Middleware
// Ensures the DB connects on a cold start before letting API routes fire
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        return res.status(500).json({ message: "Database Connection Error", error: error.message });
    }
});

//routers
app.use("/api/auth", authRoutes); // /api/auth is prefix compulsory used before router APIs
app.use("/api/quantity-entry", packingRouters);

// Error Middleware
app.use(errorMiddleware);

export default app;
