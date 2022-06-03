import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

export default async function refreshToken(
  req: Request,
  response: Response
) {
        let { uid, playerId } = req.body;
        if (!uid || !playerId)
            return response.status(400).send({ msg: "Données incomplètes!" });
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          playerId: playerId,
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
