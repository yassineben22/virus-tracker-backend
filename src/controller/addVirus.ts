import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function addVirus(req: Request, response: Response) {
    if (!req.body.name)
        return response.status(400).send({ msg: "Données incomplètes!" });
      await admin
        .firestore()
        .collection("virus")
        .add({
          name: req.body.name,
        })
        .then(() => {
          response.status(201).send({
            msg: "Virus crée avec succes",
          });
        })
        .catch((err) => {
          response
            .status(400)
            .send({ msg: "Erreur est survenue lors de la creation" });
        });
}
