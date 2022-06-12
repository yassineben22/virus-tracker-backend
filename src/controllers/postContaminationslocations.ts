import { Request, Response } from "express";
import admin from "firebase-admin";
import checkDateIsBetween from "../utils/checkDateIsBetween";

export default async function postContaminationslocations(
  req: Request,
  res: Response
) {
  try {
    let { dateStart, dateEnd } = req.body;
    if(!dateStart || !dateEnd) return res.status(400).send({msg: "Données incomplètes!"});
    let contaminationList: admin.firestore.DocumentData[] = [];
    await admin
      .firestore()
      .collection("contaminations")
      .get()
      .then((contaminations) => {
          contaminations.forEach((contamination) => {
            if (
              checkDateIsBetween(
                dateStart,
                dateEnd,
                contamination.data().contaminationTime
              )
            ) {
              contaminationList.push({
                lat: contamination.data().latitude,
                lng: contamination.data().longitude,
              });
            }
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
