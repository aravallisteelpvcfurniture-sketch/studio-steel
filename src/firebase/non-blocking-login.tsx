'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { Firestore, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { setDocument } from './non-blocking-updates';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password);
}

/**
 * Handles the logic for creating a user document in Firestore after a social sign-in.
 * It checks if the user document already exists. If not, it creates a new one.
 */
const handleSocialSignIn = async (firestore: Firestore, userCredential: UserCredential) => {
    const newUser = userCredential.user;
    const userDocRef = doc(firestore, "users", newUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        const [firstName, ...lastNameParts] = (newUser.displayName || '').split(' ');
        const lastName = lastNameParts.join(' ');
        
        const userData = {
            id: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            firstName: firstName || '',
            lastName: lastName || '',
            photoURL: newUser.photoURL,
            signUpDate: serverTimestamp(),
        };
        await setDocument(userDocRef, userData, { merge: true });
    }
};

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth, firestore: Firestore): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider)
    .then((result) => handleSocialSignIn(firestore, result))
    .catch((error) => {
        console.error("Google sign-in error:", error);
    });
}

/** Initiate Twitter sign-in (non-blocking). */
export function initiateTwitterSignIn(authInstance: Auth, firestore: Firestore): void {
  const provider = new TwitterAuthProvider();
  signInWithPopup(authInstance, provider)
    .then((result) => handleSocialSignIn(firestore, result))
    .catch((error) => {
        console.error("Twitter sign-in error:", error);
    });
}

/** Initiate Facebook sign-in (non-blocking). */
export function initiateFacebookSignIn(authInstance: Auth, firestore: Firestore): void {
  const provider = new FacebookAuthProvider();
  signInWithPopup(authInstance, provider)
    .then((result) => handleSocialSignIn(firestore, result))
    .catch((error) => {
        console.error("Facebook sign-in error:", error);
    });
}
