import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getAdmin(req: Request, res: Response) {
    if (!req.body.uid)
      return res.status(400).send({ msg: "Données incomplètes!" });
  const user = await admin
    .firestore()
    .collection("admins")
    .doc(req.body.uid)
    .get();
  if (user.exists)
    res.send({
      uid: user.id,
      ...user.data(),
    });
  else return res.status(400).send({ msg: "Donnes de l'admin introuvables!" });
}
