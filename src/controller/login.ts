import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";

export default async function login(req: Request, response: Response) {
  const { email, password } = req.body;
  if (!email || !password)
    return response.status(400).send({ msg: "Données incomplètes!" });
  try {
    await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`,
        {
          email: email,
          password: password,
        }
      )
      .then(async (res) => {
        const uid = res.data.localId;
        var isAdmin = false;
        await admin
          .firestore()
          .collection("admins")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              return 
            }
          });
        const token = jwt.sign(
          {
            uid: uid,
            isAdmin: isAdmin,
          },
          `${process.env.TOKEN_SECRET}`,
          {
            expiresIn: `${process.env.expiresIn}`,
          }
        );
        response.status(200).send({ token: token });
      })
      .catch((error) => {
        response.send("Erreur lors de l authentication!");
      });
  } catch (error) {
    response.send("Erreur!");
  }
}
