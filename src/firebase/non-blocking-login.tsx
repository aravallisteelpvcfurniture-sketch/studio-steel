'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  FacebookAuthProvider,
  User,
} from 'firebase/auth';
import { Firestore, doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from './non-blocking-updates';


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

async function handleSocialSignIn(auth: Auth, firestore: Firestore, user: User) {
  const userDocRef = doc(firestore, "users", user.uid);
  const userData = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // Add any other details you want to save from the social provider
  };
  // Use setDoc with merge: true to create or update the user document
  setDocumentNonBlocking(userDocRef, userData, { merge: true });
}

export function initiateGoogleSignIn(auth: Auth, firestore: Firestore): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(result => {
      handleSocialSignIn(auth, firestore, result.user);
  }).catch(error => {
      console.error("Google Sign-In Error:", error);
      // Optionally, show a toast to the user
  });
}

export function initiateTwitterSignIn(auth: Auth, firestore: Firestore): void {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider).then(result => {
        handleSocialSignIn(auth, firestore, result.user);
    }).catch(error => {
        console.error("Twitter Sign-In Error:", error);
    });
}

export function initiateFacebookSignIn(auth: Auth, firestore: Firestore): void {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then(result => {
        handleSocialSignIn(auth, firestore, result.user);
    }).catch(error => {
        console.error("Facebook Sign-In Error:", error);
    });
}