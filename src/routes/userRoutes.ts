import express, { NextFunction, Request, Response } from "express";
import addContact from "../controllers/addContact";
import addContamination from "../controllers/addContamination";
import checkEmail from "../controllers/checkEmail";
import deleteUser from "../controllers/deleteUser";
import getExposition from "../controllers/getExposition";
import getUser from "../controllers/getUser";
import getViruses from "../controllers/getViruses";
import refreshToken from "../controllers/refreshToken";
import resetPassword from "../controllers/resetPassword";
import modifyUser from "../controllers/userModify";
import userModifyPassword from "../controllers/userModifyPassword";
import userRegister from "../controllers/userRegister";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

//unprotected routes

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
  '/checkEmail',
  (req: Request, res: Response, next: NextFunction) => {
    checkEmail(req, res);
  }
)

router.use(authMiddleware);

//protected routes

router.get(
  "/getUser",
  async (req: Request, res: Response, next: NextFunction) => {
    await getUser(req, res);
  }
);

router.get(
  "/getViruses",
  (req: Request, res: Response, next: NextFunction) => {
    getViruses(req, res);
  }
);

router.get("/getExposition", (req: Request, res: Response) => {
  getExposition(req, res);
});

router.post(
  "/addContamination",
  (req: Request, res: Response) => {
    addContamination(req, res);
  }
);

router.post(
  "/addContact",
  (req: Request, res: Response, next: NextFunction) => {
    addContact(req, res);
  }
);

router.put(
  "/modifyUser",
  (req: Request, res: Response, next: NextFunction) => {
    modifyUser(req, res, next);
  }
);

router.put(
  "/updateToken",
  (req: Request, res: Response, next: NextFunction) => {
    refreshToken(req, res);
  }
);

router.put(
  "/modifyPassword",
  async (req: Request, res: Response, next: NextFunction) => {
    await userModifyPassword(req, res);
  }
);


router.delete(
  "/deleteUser",
  (req: Request, res: Response, next: NextFunction) => {
    deleteUser(req, res, next);
  }
);

module.exports = {
  routes: router,
};
