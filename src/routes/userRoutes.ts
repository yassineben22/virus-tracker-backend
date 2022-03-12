import express, { NextFunction, Request, Response } from "express";
import getUser from "../controller/getUser";
import login from "../controller/login";
import modifyUser from "../controller/userModify";
import userModifyPassword from "../controller/userModifyPassword";
import userRegister from "../controller/userRegister";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  userRegister(req, res);
});

router.post(
  "/login",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    login(req, res);
  }
);

router.put(
  "/modifyUser",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    modifyUser(req, res, next);
  }
);

router.get(
  "/getUser",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await getUser(req, res);
  }
);

router.put(
  "/modifyPassword",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await userModifyPassword(req, res);
  }
);

module.exports = {
  routes: router,
};
