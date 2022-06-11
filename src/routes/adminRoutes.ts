import express, { NextFunction, Request, Response } from "express";
import addVirus from "../controllers/addVirus";
import deleteUser from "../controllers/deleteUser";
import deleteVirus from "../controllers/deleteVirus";
import getAdmin from "../controllers/getAdmin";
import getContactsLocations from "../controllers/getContactsLocation";
import getContaminationslocations from "../controllers/getContaminationslocations";
import getStats from "../controllers/getStats";
import getUser from "../controllers/getUser";
import getUsers from "../controllers/getUsers";
import getViruses from "../controllers/getViruses";
import postContactsLocations from "../controllers/postContactsLocations";
import postContaminationslocations from "../controllers/postContaminationslocations";
import registerData from "../controllers/registerData";
import searchUsers from "../controllers/searchUsers";
import modifyUser from "../controllers/userModify";
import virusesData from "../controllers/virusesData";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

//GET ROUTES

router.get("/getAdmin", (req: Request, res: Response, next: NextFunction) => {
  getAdmin(req, res);
});

router.get("/getUsers", (req: Request, res: Response, next: NextFunction) => {
  getUsers(req, res);
});

router.get("/virusesData", (req: Request, res: Response, next: NextFunction) => {
  virusesData(req, res);
});

router.get("/registerData", (req: Request, res: Response, next: NextFunction) => {
  registerData(req, res);
});

router.get("/getViruses", (req: Request, res: Response, next: NextFunction) => {
  getViruses(req, res);
});

router.get("/getStats", (req: Request, res: Response, next: NextFunction) => {
  getStats(req, res);
});

router.get("/getContactsLocations", (req: Request, res: Response, next: NextFunction) => {
  getContactsLocations(req, res);
});

router.post("postContactsLocations", (req: Request, res: Response, next: NextFunction) => {
  postContactsLocations(req, res);
});

router.get("/getContaminationslocations", (req: Request, res: Response, next: NextFunction) => {
  getContaminationslocations(req, res);
});

router.post("/postContaminationslocations", (req: Request, res: Response, next: NextFunction) => {
  postContaminationslocations(req, res);
});

// POST ROUTES

router.post(
  "/searchUsers",
  (req: Request, res: Response, next: NextFunction) => {
    searchUsers(req, res);
  }
);

router.post("/getUser", (req: Request, res: Response, next: NextFunction) => {
  getUser(req, res);
});

router.post('/addVirus', (req: Request, res: Response, next: NextFunction) => {
  addVirus(req, res);
});

router.post('/deleteVirus', (req: Request, res: Response, next: NextFunction) => {
  deleteVirus(req, res);
});

router.post(
  "/deleteUser",
  (req: Request, res: Response, next: NextFunction) => {
    deleteUser(req, res, next);
  }
);

// PUT ROUTES

router.put("/modifyUser", (req: Request, res: Response, next: NextFunction) => {
  modifyUser(req, res, next);
});

module.exports = {
  routes: router,
};
