// auth.service.ts

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: Auth) {}

  // Email/Password Sign Up
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Email/Password Sign In
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Google Sign In
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Sign Out
  signOut() {
    return signOut(this.auth);
  }
}
