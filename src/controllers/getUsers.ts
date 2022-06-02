import { Request, Response } from "express";
import admin from "firebase-admin";

function chunk (items: any, size: number) {  
  const chunks = []
  items = [].concat(...items)

  while (items.length) {
    chunks.push(
      items.splice(0, size)
    )
  }

  return chunks
}

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
        let newList = chunk(usersList, 2);
        return res.status(200).send(newList);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send({ msg: "Erreur inconnue!" });
  }
}
