import {Request, Response} from "express";
import admin from "firebase-admin";

export default async function getExposition(req: Request, res: Response) {
    try {
        let uid = req.body.uid;
        await admin.firestore().collection("users").doc(uid).get().then(async (user:any) => {
            if (user.exists) {
                console.log(user.data().expositionUid, user.data().contactUid)
                await admin.firestore().collection("users").doc(user.data().expositionUid).collection("contacts").doc(user.data().contactUid).get().then(async (contact:any) => {
                    if (contact.exists) {
                        await admin.firestore().collection("users").doc(user.data().expositionUid).get().then((user2:any) => {
                            if (user2.exists) {
                                return res.status(200).send({
                                    nom: user2.data().fullName,
                                    ...contact.data()
                                })
                            } else {
                                
                                return res.status(400).send({ msg: "Utilisateur non trouvé!" });
                            }
                        }).catch(() => {
                            return res.status(400).send({ msg: "Erreur inconnue!" });
                        })
                    }
                    else {
                        return res.status(400).send({ msg: "Erreur lors de la récupération de l'exposition!" });
                    }
                }).catch(() => {
                    return res.status(400).send({ msg: "Erreur lors de la récupération des données!" });
                });
            } else {
                return res.status(400).send({ msg: "Utilisateur non trouvé!" });
            }
        }).catch(() => {
            return res.status(400).send({ msg: "Erreur lors de la récupération de l'utilisateur!" });
        });

    } catch(error:any){
        return res.status(400).send({ msg: "Une erreur est survenue!" });
    }
}