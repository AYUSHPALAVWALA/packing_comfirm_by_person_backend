import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import packingRouters from "./modules/packing/packing.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config(); //for .env file

const app = express(); // create express server instance here are store in app variable

//middlewares
app.use(express.json()); //middleware use to parses incoming JSON requests and makes data available in req.body
app.use(express.urlencoded({ extended: true })); //middleware use to parses URL-encoded form data (HTML form submissions)
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true })); //middleware use to allows frontend (different port/domain) to access backend APIs

//routers
app.use("/api/auth", authRoutes); // /api/auth is prefix compulsory used before router APIs
app.use("/api/quantity-entry", packingRouters);

// Error Middleware
app.use(errorMiddleware);

export default app;
