import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import noteRouter from "./routes/Notes";
import userRouter from "./routes/User"
import session from "express-session";
import MongoStore from "connect-mongo"
 const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/notes", noteRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An error in server has occured";
  if (error instanceof Error) errorMessage = error.message;
  console.log(error);

  res.status(500).json({ error: errorMessage });
});

export default app;
