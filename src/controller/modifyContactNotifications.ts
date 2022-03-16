import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

export default async function modifyContactNotifications(
  req: Request,
  response: Response,
  next: NextFunction
) {
  try {
    if (!req.body.email && !req.body.tel)
      return response.status(400).send({ msg: "Données incomplètes!" });
    await admin
      .firestore()
      .collection("adminActions")
      .doc("contactNotifications")
      .update({
        email: req.body.email,
        tel: req.body.tel,
      })
      .then(() => {
        response
          .status(201)
          .send("Notifications de contact modifiées avec succes");
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
