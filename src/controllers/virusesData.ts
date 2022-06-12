import { Request, Response } from "express";7
import admin from "firebase-admin";

export default async function virusesData(req: Request, res: Response){
    try {
        let idx1=0, idx2=0;
        let final:any = {
            labels: [],
            datasets: [ { data: [], backgroundColor: ['#5a58c3', '#f9df99', '#aad3ab', '#4B8673', '#FFB72B', '#FA4EAB', '#C36A2D' ], } ]
        }
        await admin
          .firestore()
          .collection("viruses")
          .get()
          .then(async (viruses) => {
              while(idx1 < viruses.docs.length){
                final.labels.push(viruses.docs[idx1].data().name);
                await admin.firestore().collection('contaminations').where('uidVirus', '==', viruses.docs[idx1].id).get().then((contaminations) => {
                  final.datasets[0].data.push(contaminations.docs.length);
                });
                idx1++;
              }
              return res.status(200).send(final);
          })
          .catch((err) => {
            return res.status(400).send(err);
          });
      } catch (err) {
        return res.status(400).send({ msg: "Erreur inconnue!" });
      }
}