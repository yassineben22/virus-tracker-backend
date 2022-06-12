import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function modifyVirus(req: Request, res: Response) {
  try {
    let virus = req.body.virus;
    if (!virus) return res.status(400).send({ msg: "Données incomplètes!" });

    await admin
      .firestore()
      .collection("viruses")
      .doc(virus.uid)
      .collection("symptomes")
      .get()
      .then(async (symptomes) => {
        let idx = 0;
        while (idx < virus.symptomes.length) {
          await admin
            .firestore()
            .collection("viruses")
            .doc(virus.uid)
            .collection("symptomes")
            .doc(symptomes.docs[idx].id)
            .delete();
          idx++;
        }
      });

    await admin
      .firestore()
      .collection("viruses")
      .doc(virus.uid)
      .update({
        name: virus.name,
      })
      .then(async () => {
        let idx = 0;
        while (idx < virus.symptomes.length) {
          await admin
            .firestore()
            .collection("viruses")
            .doc(virus.uid)
            .collection("symptomes")
            .add({
              name: virus.symptomes[idx].name,
            });
          idx++;
        }
        return res.status(200).send({ msg: "Virus modifié!" });
      })
      .catch(() => {
        res.status(400).send({ msg: "Une erreur est survenue" });
      });
  } catch (error: any) {
    return res.status(400).send({ msg: "Une erreur est survenue!" });
  }
}
