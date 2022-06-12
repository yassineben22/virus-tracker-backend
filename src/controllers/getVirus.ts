import { Request, Response} from "express";
import admin from "firebase-admin";

export default async function getVirus(req: Request, res: Response) {

    let uid = req.body.uid;
    if(!uid) return res.status(400).send({ msg: "Données incomplètes!" });

    await admin.firestore().collection("viruses").doc(uid).get().then(async (virus) => {
        if (virus.exists) {
            await admin.firestore().collection("viruses").doc(virus.id).collection("symptomes").get().then((symptomes) => {
                return res.status(200).send({
                    'uid': virus.id,
                    ...virus.data(),
                    symptomes: symptomes.docs.map((symptome) => {
                        return symptome.data();
                    })
                })
            });

        } else {
            return res.status(400).send({msg: "Virus introuvable!"});
        }
    }
    ).catch((err:any) => {
        if(err.code === "not-found") {
            return res.status(400).send({msg: "Virus introuvable!"});
        }
        else {
            return res.status(400).send({msg: "Une erreur est survenue"});
        }
    });
}
