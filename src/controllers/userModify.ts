import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import getDate from "../utils/getDate";

export default async function modifyUser(
  req: Request,
  response: Response,
  next: NextFunction
) {
  await admin
    .auth()
    .updateUser(req.body.uid, {
      email: req.body.email,
    })
    .then(async (userRecord) => {
      await admin
        .firestore()
        .collection("users")
        .doc(userRecord.uid)
        .update({
          ...req.body,
        })
        .then(() => {
          return response.status(200).send({ msg: "Utilisateur modifié avec succès" });
        })
        .catch((err) => {
          return response
            .status(400)
            .send({ msg: "Erreur est survenue lors de la modification" });
        });
    })
    .catch((err) => {
      return response
        .status(400)
        .send({ msg: "Erreur est survenue lors de la modification" });
    });
}
