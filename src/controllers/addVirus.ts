import { Request, Response } from "express";
import admin from "firebase-admin";
import getDate from "../utils/getDate";

export default async function addVirus(req: Request, response: Response) {
  if (!req.body.name || !req.body.symptomes)
    return response.status(400).send({ msg: "Données incomplètes!" });
  await admin
    .firestore()
    .collection("viruses")
    .add({
      name: req.body.name,
      added: getDate(),
    })
    .then(async (virus:any) => {
      let idx = 0;
      while (idx < req.body.symptomes.length) {
        if (req.body.symptomes[idx].nom_symptome != "") {
          await admin
            .firestore()
            .collection("viruses")
            .doc(virus.id)
            .collection("symptomes")
            .add({
              name: req.body.symptomes[idx].nom_symptome,
            });
        }
        idx++;
      }
      return response.status(200).send({ msg: "Virus ajouté!" });
    })
    .catch((err) => {
      return response
        .status(400)
        .send(err.message);
    });
}
