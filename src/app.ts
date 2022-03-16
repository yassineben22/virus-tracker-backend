import express, { NextFunction, Request, Response } from "express";
import login from "./controller/login";
import connect from "./utils/connect";
import logger from "./utils/logger";
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/api/login", (req: Request, res: Response, next: NextFunction) => {
  login(req, res);
});

app.use("/api/user", userRoutes.routes);

app.use("/api/admin", adminRoutes.routes);

app.listen(port, async () => {
  logger.info(`app running on port ${port}`);
  await connect();
});
