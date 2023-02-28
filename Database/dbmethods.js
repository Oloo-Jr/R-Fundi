import { firestore } from "firebase/firestore";
import { db, auth } from "./config";
import firebase from 'firebase';


export const createUserDocument = (name,idNumber,phoneNumber,) => {
    return db.collection('users').doc(auth.currentUser.uid).set({
        name,
        idNumber,
        phoneNumber,
        imageurl,
        email: auth.currentUser.email
    })
}

