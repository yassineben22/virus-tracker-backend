import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function getContaminationslocations(
  req: Request,
  res: Response
) {
  try {
    let contaminationList: admin.firestore.DocumentData[] = [];
    await admin
      .firestore()
      .collection("contaminations")
      .get()
      .then((contaminations) => {
        contaminations.forEach((contamination) => {
          contaminationList.push({
            lat: contamination.data().latitude,
            lng: contamination.data().longitude,
          });
        });

        return res.status(200).send(contaminationList);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send({ msg: "Erreur inconnue!" });
  }
}
