import { Request, Response } from "express";
import axios from "axios";
import admin from "firebase-admin";

export default async function userModifyPassword(req: Request, res: Response) {
  let { uid, email, previousPassword, newPassword } = req.body;
  if (
    !email ||
    !previousPassword ||
    !newPassword
  )
    return res.status(400).send({ msg: "Données incomplètes!" });
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`,
      {
        email: email,
        password: previousPassword,
      }
    )
    .then(async (response) => {
      await admin
        .auth()
        .updateUser(uid, { password: newPassword })
        .then(async (userRecord) => {
          await admin
            .firestore()
            .collection("users")
            .doc(userRecord.uid)
            .update({ password: newPassword })
            .then((user) => {
              res
                .status(200)
                .send({ msg: "Mot de passe modifié avec succès!" });
            })
            .catch((err) => {
              res.status(400).send("Une erreur est survenue!");
            });
        })
        .catch((err) => {
          res.status(400).send("Une erreur est survenue!");
        });
    })
    .catch((error) => {
      res.status(400).send("Mot de passe incorrect!");
    });
}
