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
      .then(async (viruses) => {
        let idx1=0;
        while(idx1 < viruses.docs.length){
          uid = viruses.docs[idx1].id;
          if(req.baseUrl.includes("admin")){
            virusesList.push({
              'uid': uid,
              'virusName': viruses.docs[idx1].data().name,
              'added': viruses.docs[idx1].data().added,
            });
          }
          else{
            let symptomesList: admin.firestore.DocumentData[] = [];
            await admin.firestore().collection("viruses").doc(uid).collection("symptomes").get().then((symptomes) => {
              let idx2 = 0;
              while(idx2 < symptomes.docs.length){
                symptomesList.push({
                  'name': symptomes.docs[idx2].data().name,
                });
                idx2++;
              }
            });
            virusesList.push({
              'uid': uid,
              'virusName': viruses.docs[idx1].data().name,
              'symptomes': symptomesList,
            });
          }
          idx1++;
        }
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
