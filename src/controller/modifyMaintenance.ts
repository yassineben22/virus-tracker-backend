import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

export default async function modifyUser(req: Request, response: Response, next: NextFunction) {
  try {
    if (!req.body.activated && !req.body.message)
      return response.status(400).send({ msg: "Données incomplètes!" });
    await admin
      .firestore()
      .collection("adminActions")
      .doc("maintenance")
      .update({
        activated: req.body.activated,
        message: req.body.message,
      })
      .then(() => {
        response.status(201).send("Maintenance modifiée avec succes");
      })
      .catch((err) => {
        response
          .status(400)
          .send("Erreur est survenue lors de la modification!");
      });
  } catch (err) {
    response.status(400).send("Erreur!");
  }
}
