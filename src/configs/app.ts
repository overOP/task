import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "../routes/user.routes";

export class App {
  public app = express();

  constructor() {
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(cors({
      origin: "http://localhost:5173",
      credentials: true,
    }));

    this.app.use(cookieParser());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use("/api/users", userRoutes);
  }
}