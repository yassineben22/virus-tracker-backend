import admin from "firebase-admin";
import getDate from "./getDate";
import getDifference from "./getDifference";

export default async function refreshData(uid: string) {
  const user: any = await admin.firestore().collection("users").doc(uid).get();
  if (getDifference(user.data().refreshDate) != 0) {
    await admin
      .firestore()
      .collection("users")
      .doc(user.id)
      .collection("contacts")
      .get()
      .then(async (contacts) => {
        contacts.forEach(async (contact) => {
          await admin
            .firestore()
            .collection("users")
            .doc(user.id)
            .collection("contacts")
            .doc(contact.id)
            .get()
            .then(async (toCheck: any) => {
              if (getDifference(toCheck.data().contactTime) > 15) {
                await admin
                  .firestore()
                  .collection("users")
                  .doc(user.id)
                  .collection("contacts")
                  .doc(contact.id)
                  .delete()
                  .then()
                  .catch();
              }
            });
        });
      });
    await admin
      .firestore()
      .collection("users")
      .doc(user.id)
      .update({
        refreshDate: getDate(),
      })
      .then(() => {})
      .catch(() => {});
  }
}