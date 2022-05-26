import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import getAge from "../utils/getAge";
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
          lastModified: getDate(),
          age: getAge(req.body.birthDate),
        })
        .then(() => {
          response.status(200).send({ msg: "Utilisateur modifié avec succes" });
        })
        .catch((err) => {
          response
            .status(400)
            .send({ msg: "Erreur est survenue lors de la modification" });
        });
    })
    .catch((err) => {
      response
        .status(400)
        .send({ msg: "Erreur est survenue lors de la modification" });
    });
}
