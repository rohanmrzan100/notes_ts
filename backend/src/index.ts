
import mongoose from "mongoose";
import "dotenv/config";
import app from "./app";




mongoose
  .connect(
    `mongodb+srv://rohanmrzan100:${process.env.MONGODB_PW}@cluster0.8eze3i1.mongodb.net/notesAPP`
  )
  .then(() => {
    const port = process.env.port || 3001;
    app.listen(port, () => {
      console.log(`APP is running on port ${port}`);
    });
    console.log("connected to DB");
  });
