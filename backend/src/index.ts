import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";

mongoose
  .connect(process.env.MONGODB_PW!)

  .then(() => {
    const port = process.env.port;
    app.listen(port, () => {
      console.log(`APP is running on port ${port!}`);
    });
    console.log("connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
