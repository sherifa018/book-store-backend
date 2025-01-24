import express from "express";
import { PORT, mongourl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(cors());


let corsOptions = {
  origin : ['http://localhost:5173','https://book-store-frontend-five-ebon.vercel.app'],
}

app.use(cors(corsOptions))
//Middleware for parsing req body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcome");
});

//middleware for handling cors policy


//Middleware to handle requests with prefix of
app.use("/books", booksRoute);
app.use("/user", userRoute);

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("App connected to data base");
    app.listen(PORT, () => {
      console.log("App is listening");
    });
  })
  .catch((error) => {
    console.log(error);
  });
