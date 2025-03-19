import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { DBConnection } from "./DB/connection.js";
import authRouter from "./modules/authModule/auth.router.js";
import interviewRouter from "./modules/interviewModule/interview.router.js";
import { globalErrorHandler } from "./utils/errorHandlers/globalErrorHandler.js";

export const bootstrap = async (app, express) => {
  try {
    // Connect to database
    await DBConnection();
    console.log("✅ Database connected successfully");

    // CORS Configuration
    const corsOptions = {
      origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
      credentials: true, // Allow cookies and authentication headers
      methods: ["GET", "POST", "PUT", "DELETE"], // Restrict allowed methods
      allowedHeaders: ["Content-Type", "Authorization"],
    };
    app.use(cors(corsOptions));

    // Middleware
    app.use(express.json());

    // Routes
    app.use("/auth", authRouter);
    app.use("/interview", interviewRouter);

    // Handle Undefined Routes (404)
    app.use("*", (req, res, next) => {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Page not found" });
    });

    // Global Error Handler
    app.use(globalErrorHandler);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit process on failure
  }
};
