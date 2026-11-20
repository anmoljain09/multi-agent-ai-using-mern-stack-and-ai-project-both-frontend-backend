/*

import { initializeApp, cert } from "firebase-admin/app";
➡️ Firebase Admin App ko start (initialize) karne ke functions import kiye.

import { getAuth } from "firebase-admin/auth";
➡️ Firebase Authentication use karne ke liye getAuth() import kiya.

import serviceAccount from "./serviceAccountKey.json" with { type: "json" };
➡️ Firebase Console se download ki hui secret JSON key import ki.

const app = initializeApp({
  credential: cert(serviceAccount),
});
➡️ Service account ki madad se Firebase Admin ko connect/start kiya.

*/

/*

import firebaseAdmin from "../config/firebase.js";

const decoded = await firebaseAdmin.auth.verifyIdToken(token);

To firebaseAdmin ke andar ye dono cheezein milengi:
Initialized Firebase App
Firebase Auth object
i.e.
firebaseAdmin.app
firebaseAdmin.auth

auth Firebase Admin ka Authentication service hai.
Iske paas auth se related methods hoti hain, jaise:
firebaseAdmin.auth.verifyIdToken()
firebaseAdmin.auth.getUser()
firebaseAdmin.auth.createUser()
.verifyIdToken(token)
Ye function frontend se aaya hua Firebase ID Token check karta hai.

decoded
Agar token valid hai to kuch aisa object milta hai:

{
  uid: "AbCd123",
  email: "user@gmail.com",
  name: "Aman",
  picture: "...",
  email_verified: true,
  iat: 1721000000,
  exp: 1721003600
}

req.user = decoded;

console.log(req.user.uid);
console.log(req.user.email);

*/


import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

export const app = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth(app);