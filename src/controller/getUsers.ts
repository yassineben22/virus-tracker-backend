import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getUsers(req: Request, res: Response) {
  try {
    let usersList: admin.firestore.DocumentData[] = [];
    let uid;
    await admin
      .firestore()
      .collection("users")
      .get()
      .then((users) => {
        users.forEach((user) => {
          uid = user.id;
          usersList.push({
            uid,
            ...user.data(),
          });
        });
        return res.status(200).send(usersList);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send("Erreur inconnue!");
  }
}
