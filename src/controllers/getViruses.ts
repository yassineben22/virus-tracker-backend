import { Request, Response } from "express";
import admin from "firebase-admin";

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

export default async function getViruses(req: Request, res: Response) {
  try {
    let virusesList: admin.firestore.DocumentData[] = [];
    let final: admin.firestore.DocumentData[] = [];
    let uid;
    await admin
      .firestore()
      .collection("viruses")
      .get()
      .then((users) => {
        users.forEach((virus) => {
          uid = virus.id;
          virusesList.push({
            'uid': uid,
            'virusName': virus.data().name,
            'added': virus.data().added,
          });
        });
        if(req.baseUrl.includes("admin")){
          final = chunk(virusesList, 4);
          return res.status(200).send(final);
        } 
        else {
          return res.status(200).send(virusesList);
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send({ msg: "Erreur inconnue!" });
  }
}
