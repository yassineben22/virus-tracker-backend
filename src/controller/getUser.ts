import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getUser(req: Request, res: Response) {
  const user = await admin
    .firestore()
    .collection("users")
    .doc(req.body.uid)
    .get();
  if (user.exists)
    res.send({
      uid: user.id,
      ...user.data(),
    });
  else res.status(400).send({ msg: "user not found" });
}
