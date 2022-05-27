import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getUsers(req: Request, res: Response) {
  try {
    let usersList: admin.firestore.DocumentData[] = [];
    let final: any[] = [];
    let uid;
    let i, j;
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
          for(i=0;i<Math.floor(usersList.length/5);i++){
            // console.log(usersList[i])
          }
        });
        return res.status(200).send(usersList);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send({ msg: "Erreur inconnue!" });
  }
}
