import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getStats(req: Request, res: Response) {
  try {
    let usersCount: number = 0, infectedCount: number = 0;
    await admin
      .firestore()
      .collection("users")
      .get()
      .then((users) => {
        let idx = 0
        while (idx < users.docs.length) {
          usersCount++;
          if (users.docs[idx].data().infected) infectedCount++;
          idx++;
        }
        return res.status(200).send({
          usersCount: usersCount,
          infectedCount: infectedCount,
        });
      })
      .catch((err) => {
        res.status(400).send({ msg: "Erreur inconnue!" });
      });
  } catch (err) {
    return res.status(400).send({msg: "Erreur inconnue!"});
  }
}
