import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getUser(req: Request, res: Response) {
  if (!req.body.uid)
    return res.status(400).send({ msg: "Données incomplètes!" });
  const user = await admin
    .firestore()
    .collection("users")
    .doc(req.body.uid)
    .get();
  console.log(req.body.uid);

  if (user.exists)
    res.send({
      uid: user.id,
      ...user.data(),
    });
  else res.status(400).send({ msg: "Utilisateur introuvable!" });
}
