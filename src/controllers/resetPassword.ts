import { Request, Response } from "express";
import admin from "firebase-admin";
import getDate from "../utils/getDate";

export default async function resetPassword(req: Request, res: Response) {
  let { email, newPassword } = req.body;
  if (!newPassword || !email)
    return res.status(400).send({ msg: "Données incomplètes!" });
  await admin.auth().getUserByEmail(email).then(async (user)=> {
      let uid = user.uid;
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
    });
}
