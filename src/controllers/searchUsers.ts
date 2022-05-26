import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function searchUsers(req: Request, res: Response) {
  try {
    if (!req.body.searchValue)
      return res.status(400).send({ msg: "Données incomplètes!" });
    let usersList: admin.firestore.DocumentData[] = [];
    let uid: string,
      searchValue = req.body.searchValue;
    await admin
      .firestore()
      .collection("users")
      .get()
      .then((users) => {
        users.forEach((user) => {
          if (
            user.data().fullName.includes(searchValue) ||
            user.data().username.includes(searchValue) ||
            user.id == searchValue
          ) {
            uid = user.id;
            usersList.push({
              uid,
              ...user.data(),
            });
          }
        });
        if (usersList.length == 0)
          return res.status(400).send({ msg: "Aucun utilisateur trouvé!" });
        return res.status(200).send(usersList);
      })
      .catch((err) => {
        res.status(400).send({ msg: "Erreur!" });
      });
  } catch (err) {
    return res.status(400).send({msg: "Erreur inconnue!"});
  }
}
