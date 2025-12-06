import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import Acticle from "./models/article.model";

dotenv.config();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Database
database.connect();

// Rest API
app.get("/articles", async (req: Request, res: Response) => {
  const articles = await Acticle.find({
    deleted: false,
  });
  res.json({
    articles,
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
