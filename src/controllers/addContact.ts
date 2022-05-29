import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function addContact(req: Request, res: Response) {
  try {
    let { uid, contactUid, contactTime } = req.body;
    if (!req.body.uid || !req.body.contactUid || !req.body.contactTime)
      return res.status(400).send({ msg: "Données incomplètes!" });
    let user = await admin
      .firestore()
      .collection("users")
      .doc(contactUid)
      .get()

      if(!user.exists){
        return res.status(400).send({ msg: "Utilisateur Introuvable!" });
      }
    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("contacts")
      .get()
      .then(async (contacts) => {
        if (contacts.docs.length >0) {
          contacts.forEach(async (contact) => {
            if(contact.data().contactUid === contactUid) {
              await admin.firestore().collection("users").doc(uid).collection("contacts").doc(contact.id).delete().then(()=>{}).catch(()=>{});
            }
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
        return res.status(200).send({msg: "Contact ajouté avec succes!"});
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
