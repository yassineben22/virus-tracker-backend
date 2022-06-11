import { Request, Response } from "express";
import admin from "firebase-admin";

export default async function modifyAdmin(req: Request, res: Response) {
    try {   
        const uid = req.body.uid;
        const { email, nom, prenom } = req.body; 

        
        await admin.auth().updateUser(uid, {
            email: email,
        }).then(async (userRecord) => {

            await admin.firestore().collection("admins").doc(userRecord.uid).update({
                email: email,
                firstName: prenom,
                lastName: nom,
            }).then(() => {
                res.status(200).send({ msg: "Admin modifié avec succès!" });
            }).catch(() => {
                res.status(400).send({ msg: "Erreur lors de la modification de l'admin!" });
            })
        }).catch(() => {
            res.status(400).send({ msg: "Erreur lors de la modification de l'utilisateur!" });
        })

    } catch (error) {
        res.status(400).send({ msg: "Erreur lors de la modification de l'administrateur" });
    }
}