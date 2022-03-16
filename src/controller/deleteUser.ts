import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

export default async function deleteUser(
  req: Request,
  response: Response,
  next: NextFunction
) {
  if (!req.body.uid)
    return response.status(400).send({ msg: "Données incomplètes!" });
  let uid = req.body.uid;
  await admin
    .auth()
    .deleteUser(uid)
    .then(async (userRecord) => {
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .delete()
        .then(() => {
          response.status(201).send("Utilisateur supprimé avec succes");
        })
        .catch((err) => {
          response
            .status(400)
            .send("Erreur est survenue lors de la supression");
        });
    })
    .catch((err) => {
      response.status(400).send("Erreur est survenue lors de la supression");
    });
}
