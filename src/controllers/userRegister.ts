import { Request, Response } from "express";
import admin from "firebase-admin";
import getDate from "../utils/getDate";

export default async function register(req: Request, response: Response) {
  let errmsgs = [];
  let { birthDate, email, fullName, gender, password, cin } = req.body;
  if (!birthDate || !email || !fullName || !gender || !password || !cin)
    return response.status(400).send({ msg: "Données incomplètes!" });
  else {
    if (
      email.length < 8 ||
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        email
      )
    ) {
      errmsgs.push("Email invalide!");
    } else if (
      password.length < 8 ||
      password.length > 50 ||
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,50}$/.test(
        password
      )
    ) {
      errmsgs.push(
        "Le mot de passe doit contenit entre 8 et 50 caractères y compris une majuscule un nombre et un caractère spécial!"
      );
    } 
    if (errmsgs.length != 0)
      return response.status(400).send({
        title: "Le données sont invalides!",
        msgs: errmsgs,
      });
  }
  await admin
    .auth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
    })
    .then(async (userRecord) => {
      await admin
        .firestore()
        .collection("users")
        .doc(userRecord.uid)
        .set({
          birthDate: birthDate,
          email: email,
          fullName: fullName,
          gender: gender,
          infected: false,
          password: password,
          registerDate: getDate(),
          cin: cin,
          lastModified: getDate(),
        })
        .then(() => {
          response.status(200).send({
            msg: "Utilisateur crée avec succes",
          });
        })
        .catch((err) => {
          response
            .status(400)
            .send({ msg: "Erreur est survenue lors de la creation" });
        });
    })
    .catch((err) => {
      if(err.code == "auth/email-already-exists"){
        response
        .status(400)
        .send({ msg: "Email existe deja!" });
      }
      response
        .status(400)
        .send({ msg: "Erreur est survenue lors de la creation" });
    });
}
