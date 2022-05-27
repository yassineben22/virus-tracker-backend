import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function addContamination(req: Request, res: Response) {
    let { uid, uidVirus, contaminationTime } = req.body;
    let fcmTokens: string[] = [];
    if (!uid || !uidVirus || !contaminationTime)
      return res.status(400).send({ msg: "Données incomplètes!" });

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
                contacts.forEach(async (contact) => {
                  await admin
                    .firestore()
                    .collection("users")
                    .doc(contact.id)
                    .get()
                    .then(function (toSend: admin.firestore.DocumentData) {
                      let fcmToken:string = toSend.data().fcmToken;
                      fcmTokens.push(fcmToken);
                    })
                    .catch(() => {});
                });
                const message = {
                  notification: {
                    title: 'Contact détecté!',
                    body: 'vous avez rencontré un malade!'
                  },
                  tokens: fcmTokens,
                };
                if(fcmTokens.length > 0){
                await admin.messaging().sendMulticast(message).then((response) => {
                  if (response.failureCount > 0) {
                    response.responses.forEach(async (resp, idx) => {
                      if (!resp.success) {
                        await admin.firestore().collection("failedNotifications").add({fcmToken: fcmTokens[idx]})
                      }
                    });
                  }
                });}
              }
              await admin
                .firestore()
                .collection("contaminations")
                .add({
                  uid: uid,
                  uidVirus: uidVirus,
                  contaminationTime: contaminationTime,
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
            })
            .catch(() => {
              return res
                .status(400)
                .send({ msg: "Une erreur est survenue!" });
            });
        } else {
          return res.status(400).send({ msg: "Virus introuvable!" });
        }
      }).catch(()=>{res.status(400).send({msg: "Une erreur est survenue!"})})
}
