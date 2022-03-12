import express, { NextFunction, Request, Response } from "express";
import connect from "./utils/connect";
import logger from "./utils/logger";
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes.routes);

app.listen(port, async () => {
  logger.info(`app running on port ${port}`);
  await connect();
});
