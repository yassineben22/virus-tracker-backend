import { Request, Response } from "express";
import admin from "firebase-admin";
import getDifference from "../utils/getDifference";
import refreshData from "../utils/refreshData";

export default async function getUser(req: Request, res: Response) {
  if (!req.body.uid)
    return res.status(400).send({ msg: "Données incomplètes!" });
  const user:any = await admin
    .firestore()
    .collection("users")
    .doc(req.body.uid)
    .get();

  if (user.exists){
    if(getDifference(user.data().refreshDate) != 0) refreshData(user.id);
    res.send({
      uid: user.id,
      ...user.data(),
    });
  }
  else res.status(400).send({ msg: "Utilisateur introuvable!" });
}