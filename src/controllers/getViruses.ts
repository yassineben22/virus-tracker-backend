import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getViruses(req: Request, res: Response) {
  try {
    let virusesList: admin.firestore.DocumentData[] = [];
    let uid;
    await admin
      .firestore()
      .collection("viruses")
      .get()
      .then((users) => {
        users.forEach((virus) => {
          uid = virus.id;
          virusesList.push({
            uid,
            'virusName': virus.data().name,
            'added': virus.data().added,
          });
        });
        return res.status(200).send(virusesList);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send({ msg: "Erreur inconnue!" });
  }
}
