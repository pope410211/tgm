import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
    authState: any = null;
    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router
    ) {
        this.fireAuth.authState.subscribe((auth) => {
            this.authState = auth;
        });
    } // end Constructor

    signUpWithEmail(email: string, password: string) {
        return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            this.authState = user;
        }).catch(err => {
            console.error('Create User Error: ', err);
            throw err;
        })
    } // Sign-up With Email. For WebMaster & Owner Only, no self login.

    loginWithEmail(email: string, password: string) {
        return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            this.authState = user;
        }).catch(err => {
            console.error('Login Error: ', err);
            throw err;
        });
    } // End Login W/ Email

    signOut(): void {
        this.fireAuth.auth.signOut();
        this.router.navigate(['']);
    }
} // end Class