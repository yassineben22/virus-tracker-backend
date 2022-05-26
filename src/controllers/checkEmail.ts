import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function checkEmail(req: Request, res: Response) {
  let { email } = req.body;
  if (!email) return res.status(400).send({ msg: "Données incomplètes!" });
  await admin
    .auth()
    .getUserByEmail(email)
    .then((user) => {
      res.status(200).send({msg: "Email existe!"});
    })
    .catch((err) => {
      if(err.code = "auth/user-not-found")
        res.status(400).send({msg: "Email n'existe pas!"});
      res.status(400).send({msg: "Une erreur est survenue!"})
    })
}