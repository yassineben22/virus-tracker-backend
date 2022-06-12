import { Request, Response } from "express";
import axios from "axios";
import admin from "firebase-admin";
import getDate from "../utils/getDate";

export default async function userModifyPassword(req: Request, res: Response) {
  let { uid, email, previousPassword, newPassword } = req.body;
  if (!email || !previousPassword || !newPassword)
    return res.status(400).send({ msg: "Données incomplètes!" });

  if (
    newPassword.length < 8 ||
    newPassword.length > 50 ||
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,50}$/.test(
      newPassword
    )
  ) {
    return res
      .status(400)
      .send({
        msg: "Le mot de passe doit contenit entre 8 et 50 caractères y compris une majuscule un nombre et un caractère spécial!",
      });
  }
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
            .update({ password: newPassword, lastModified: getDate() })
            .then((user) => {
              return res
                .status(200)
                .send({ msg: "Mot de passe modifié avec succès!" });
            })
            .catch((err) => {
              return res.status(400).send({ msg: "Une erreur est survenue!" });
            });
        })
        .catch((err) => {
          return res.status(400).send({ msg: "Une erreur est survenue!" });
        });
    })
    .catch((error) => {
      return res.status(400).send({ msg: "Mot de passe incorrect!" });
    });
}
