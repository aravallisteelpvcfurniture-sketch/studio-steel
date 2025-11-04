'use client';
import {
  Auth, 
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  User,
} from 'firebase/auth';
import { Firestore, doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from './non-blocking-updates';


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password);
}

async function handleSocialSignIn(auth: Auth, firestore: Firestore, user: User) {
  const userDocRef = doc(firestore, "users", user.uid);
  const userData = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
  };
  setDocumentNonBlocking(userDocRef, userData, { merge: true });
}

export function initiateGoogleSignIn(auth: Auth, firestore: Firestore): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(result => {
      handleSocialSignIn(auth, firestore, result.user);
  }).catch(error => {
      console.error("Google Sign-In Error:", error);
  });
}
