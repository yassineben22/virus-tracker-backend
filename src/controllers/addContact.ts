import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function addContact(req: Request, res: Response) {
  try {
    let { uid, contactUid, contactTime } = req.body;
    if (!req.body.uid || !req.body.contactUid || !req.body.contactTime)
      return res.status(400).send({ msg: "Données incomplètes!" });

    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("contacts")
      .where("contactUid", "==", contactUid)
      .get()
      .then(async (contacts) => {
        if (contacts.docs[0].exists) {
          await admin
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("contacts")
            .doc(contacts.docs[0].id)
            .delete()
            .catch(() => {
              return res.status(400).send({ msg: "Une erreur est survenue!" });
            });
        }
      });
    await admin
      .firestore()
      .collection("users")
      .doc(req.body.uid)
      .collection("contacts")
      .add({
        contactUid: contactUid,
        contactTime: contactTime,
      })
      .then(() => {
        return res.status(200).send("Contact ajouté avec succes!");
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ msg: "Erreur lors de l'ajout du contact!" });
      });
  } catch (error) {
    return res.status(400).send({ msg: "Une erreur est survenue!" });
  }
}
