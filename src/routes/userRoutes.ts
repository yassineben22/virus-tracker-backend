import express, { NextFunction, Request, Response } from "express";
import addContact from "../controllers/addContact";
import addContamination from "../controllers/addContamination";
import checkEmail from "../controllers/checkEmail";
import deleteUser from "../controllers/deleteUser";
import getUser from "../controllers/getUser";
import getViruses from "../controllers/getViruses";
import refreshToken from "../controllers/refreshToken";
import resetPassword from "../controllers/resetPassword";
import modifyUser from "../controllers/userModify";
import userModifyPassword from "../controllers/userModifyPassword";
import userRegister from "../controllers/userRegister";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
// GET ROUTES

router.get(
  "/getUser",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await getUser(req, res);
  }
);

router.get(
  "/getViruses",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    getViruses(req, res);
  }
);

// POST ROUTES

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  userRegister(req, res);
});

router.post(
  '/resetPassword',
  (req: Request, res: Response, next: NextFunction) => {
    resetPassword(req, res);
  }
)

router.post(
  "/addContamination",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    addContamination(req, res);
  }
);

router.post(
  '/checkEmail',
  (req: Request, res: Response, next: NextFunction) => {
    checkEmail(req, res);
  }
)

router.post(
  "/addContact",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    addContact(req, res);
  }
);

router.post(
  "/updateToken",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    refreshToken(req, res);
  }
);

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
