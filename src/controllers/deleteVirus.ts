import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function deleteVirus(req: Request, response: Response) {
  if (!req.body.uid)
    return response.status(400).send({ msg: "Données incomplètes!" });
  await admin
    .firestore()
    .collection("viruses")
    .doc(req.body.uid)
    .delete()
    .then(() => {
      response.status(200).send({
        msg: "Virus supprimé avec succes",
      });
    })
    .catch((err) => {
      response
        .status(400)
        .send({ msg: "Erreur est survenue lors de la suppression" });
    });
}
