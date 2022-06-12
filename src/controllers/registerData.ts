import { Request, Response } from "express";7
import admin from "firebase-admin";

export default async function registerData(req: Request, res: Response){
    try {
        let idx1=0;
        let final:any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        await admin
          .firestore()
          .collection("users")
          .get()
          .then(async (users) => {
              while(idx1 < users.docs.length){
                let date = new Date(users.docs[idx1].data().registerDate);
                final[date.getMonth()]++;
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