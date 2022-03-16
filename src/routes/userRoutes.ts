import express, { NextFunction, Request, Response } from "express";
import deleteUser from "../controller/deleteUser";
import getUser from "../controller/getUser";
import modifyUser from "../controller/userModify";
import userModifyPassword from "../controller/userModifyPassword";
import userRegister from "../controller/userRegister";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
// GET ROUTES

router.get(
  "/getUser",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await getUser(req, res);
  }
);

// POST ROUTES

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  userRegister(req, res);
});

// PUT ROUTES

router.put(
  "/modifyUser",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    modifyUser(req, res, next);
  }
);

router.put(
  "/modifyPassword",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await userModifyPassword(req, res);
  }
);

// DELETE ROUTES

router.delete(
  "/deleteUser",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    deleteUser(req, res, next);
  }
);

module.exports = {
  routes: router,
};
