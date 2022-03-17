import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function addContact(req: Request, res: Response) {
  try {
    if (!req.body.uid || !req.body.contactUid || !req.body.contactTime)
      return res.status(400).send({ msg: "Données incomplètes!" });
    await admin
      .firestore()
      .collection("users")
      .doc(req.body.uid)
      .collection("contacts")
      .add({
        contactUid: req.body.contactUid,
        contactTime: req.body.contactTime,
      })
      .then(() => {
        return res.status(201).send("Contact ajouté avec succes!");
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ msg: "Erreur lors de l'ajout du contact!" });
      });
  } catch (error) {
    return res.status(400).send({ msg: "Erreur!" });
  }
}
