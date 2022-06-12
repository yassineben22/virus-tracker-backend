import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getContactsLocations(
  req: Request,
  res: Response
) {
  try {
    let contactsList: admin.firestore.DocumentData[] = [];
    let contacts;
    await admin
      .firestore()
      .collection("users")
      .where("infected" , "==", true)
      .get()
      .then(async (users) => {
        let indexUsers = 0;
        while(indexUsers < users.docs.length){
          contacts = await admin.firestore().collection("users").doc(users.docs[indexUsers].id).collection("contacts").get();
          let index = 0;
          while(index < contacts.docs.length){
            contactsList.push({
              lat: contacts.docs[index].data().latitude,
              lng: contacts.docs[index].data().longitude,
            });
            index++;
          }
          indexUsers++;
        }
        return res.status(200).send(contactsList);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send({ msg: "Erreur inconnue!" });
  }
}
