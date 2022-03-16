import express, { NextFunction, Request, Response } from "express";
import addVirus from "../controller/addVirus";
import deleteUser from "../controller/deleteUser";
import getAdmin from "../controller/getAdmin";
import getStats from "../controller/getStats";
import getUser from "../controller/getUser";
import getUsers from "../controller/getUsers";
import modifyAppNotifications from "../controller/modifyAppNotifications";
import modifyContactNotifications from "../controller/modifyContactNotifications";
import modifyMaintenance from "../controller/modifyMaintenance";
import searchUsers from "../controller/searchUsers";
import modifyUser from "../controller/userModify";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

//GET ROUTES

router.get("/getAdmin", (req: Request, res: Response, next: NextFunction) => {
  getAdmin(req, res);
});

router.get("/getUsers", (req: Request, res: Response, next: NextFunction) => {
  getUsers(req, res);
});

router.get("/getUser", (req: Request, res: Response, next: NextFunction) => {
  getUser(req, res);
});

router.get("/getStats", (req: Request, res: Response, next: NextFunction) => {
  getStats(req, res);
});

// POST ROUTES

router.post(
  "/searchUsers",
  (req: Request, res: Response, next: NextFunction) => {
    searchUsers(req, res);
  }
);

router.post("/addVirus", (req: Request, res: Response, next: NextFunction) => {
  addVirus(req, res);
});

// PUT ROUTES

router.put("/modifyUser", (req: Request, res: Response, next: NextFunction) => {
  modifyUser(req, res, next);
});

router.put(
  "/modifyMaintenance",
  (req: Request, res: Response, next: NextFunction) => {
    modifyMaintenance(req, res, next);
  }
);

router.put(
  "/modifyAppNotifications",
  (req: Request, res: Response, next: NextFunction) => {
    modifyAppNotifications(req, res, next);
  }
);

router.put(
  "/modifyContactNotifications",
  (req: Request, res: Response, next: NextFunction) => {
    modifyContactNotifications(req, res, next);
  }
);

// DELETE ROUTES

router.delete(
  "/deleteUser",
  (req: Request, res: Response, next: NextFunction) => {
    deleteUser(req, res, next);
  }
);

module.exports = {
  routes: router,
};
