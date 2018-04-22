import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { User } from '../models/user';

@Injectable()

export class AuthService {
	authState: any = null;
	user: BehaviorSubject<User> = new BehaviorSubject(null);
	constructor(
		private fireAuth: AngularFireAuth,
		private router: Router,
		private db: AngularFireDatabase
	) {
		this.fireAuth.authState.switchMap(auth => {
			if (auth) {
				return this.db.object('Users/' + auth.uid).valueChanges();
			} else {
				return Observable.of(null);
			}
		})
		.subscribe((user) => {
			this.user.next = user;
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
		this.router.navigate(['home']);
	}
} // end Class