import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

export default async function refreshToken(
  req: Request,
  response: Response
) {
        let { uid, fcmToken } = req.body;
        if (!uid || !fcmToken)
            return response.status(400).send({ msg: "Données incomplètes!" });
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          fcmToken: fcmToken,
        })
        .then(() => {
          response.status(200).send({msg: "Token mis à jour avec succes"});
        })
        .catch((err) => {
          response
            .status(400)
            .send({ msg: "Erreur est survenue lors de la modification"});
        });
}
