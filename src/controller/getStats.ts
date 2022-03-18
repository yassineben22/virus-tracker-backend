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
        users.forEach((user) => {
          usersCount++;
          if (user.data().infected) infectedCount++;
        });
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
