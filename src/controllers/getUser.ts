import { Request, Response } from "express";
import admin from "firebase-admin";
import getDifference from "../utils/getDifference";
import refreshData from "../utils/refreshData";

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

export default async function getUser(req: Request, res: Response) {
  if (!req.body.uid)
    return res.status(400).send({ msg: "Données incomplètes!" });
  let contacts = [];
  let contactsArray = [];
  let user: any = await admin
    .firestore()
    .collection("users")
    .doc(req.body.uid)
    .get();

  if (user.exists) {
    if (req.baseUrl.includes("admin")) {
      let _contacts = await admin
        .firestore()
        .collection("users")
        .doc(user.id)
        .collection("contacts")
        .get();
      let idx = 0;
      while (idx < _contacts.docs.length) {
        let user: any = await admin
          .firestore()
          .collection("users")
          .doc(_contacts.docs[idx].data().contactUid)
          .get();
        if (user.exists) {
          contacts.push({
            ..._contacts.docs[idx].data(),
            fullName: user.data().fullName,
            'infected': user.data().infected,
          });
          contactsArray.push({
            lat: _contacts.docs[idx].data().latitude,
            lng: _contacts.docs[idx].data().longitude,
          });
        }
        idx++;
      }
    }
    if (getDifference(user.data().refreshDate) != 0) refreshData(user.id);
    let contactsFinal = chunk(contacts, 3);
    res.send({
      uid: user.id,
      ...user.data(),
      contacts: contactsFinal,
      heat: contactsArray,
    });
  } else res.status(400).send({ msg: "Utilisateur introuvable!" });
}
