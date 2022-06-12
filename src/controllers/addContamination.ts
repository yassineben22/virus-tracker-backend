import { Request, Response } from "express";
import admin from "firebase-admin";
import sendNotifications from "./sendNotifications";

export default async function addContamination(req: Request, res: Response) {
    let { uid, uidVirus, contaminationTime, latitude, longitude } = req.body;
    let appIds: string[] = [];
    let idx1 = 0, idx2 =0 , idx3 = 0; 
    if (!uid || !uidVirus || !contaminationTime || !latitude || !longitude) {
      return res.status(400).send({ msg: "Données incomplètes!" });
    }
    await admin
      .firestore()
      .collection("viruses")
      .doc(uidVirus)
      .get()
      .then(async (virus) => {
        if (virus.exists) {
          await admin
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("contacts")
            .get()
            .then(async (contacts) => {
              if (contacts.docs.length > 0) {
                while(idx1<contacts.docs.length){
                  await admin.firestore().collection("users").doc(contacts.docs[idx1].data().contactUid).update({
                    exposition: true,
                    expositionUid: uid,
                    contactUid: contacts.docs[idx1].id
                  });

                  await admin
                    .firestore()
                    .collection("users")
                    .doc(contacts.docs[idx1].data().contactUid)
                    .get()
                    .then(function (toSend: admin.firestore.DocumentData) {
                      let playerId:string = toSend.data().playerId;
                      appIds.push(playerId);
                    })
                    .catch(() => {});
                  idx1++;
                }
                if(appIds.length > 0){
                  sendNotifications(appIds)
                }
              }
              await admin
              .firestore()
              .collection("users")
              .doc(uid)
              .update({
                infected: true,
              })
              .then(async () => {
                await admin
                .firestore()
                .collection("contaminations")
                .add({
                  uid: uid,
                  uidVirus: uidVirus,
                  contaminationTime: contaminationTime,
                  latitude: latitude, 
                  longitude: longitude
                })
                .then(() => {
                  return res
                    .status(200)
                    .send({msg: "Contamination ajoutée avec succes!"});
                })
                .catch((err) => {
                  return res
                    .status(400)
                    .send({
                      msg: "Erreur lors de l'ajout de la contamination!",
                    });
                });
              }).catch(() => {
                return res.status(400).send({ msg: "Virus introuvable!" })
              })
              
            })
            .catch(() => {
              return res
                .status(400)
                .send({ msg: "Une erreur est survenue!" });
            });
        } else {
          return res.status(400).send({ msg: "Virus introuvable!" });
        }
      }).catch(()=>{return res.status(400).send({msg: "Une erreur est survenue!"})})
}
