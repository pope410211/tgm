import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'app-login',
    templateUrl: '../pages/login-modal.component.html'
})

export class LoginModalComponent implements OnInit {
 email = '';
 password = '';
 errorMessage = '';
 error: {name: string, message: string} = {name: '', message: ''};
 roles: Array<string>;
 sku: string;
 constructor(
    public authService: AuthService,
    private router: Router,
    private db: AngularFireDatabase
 ){
    authService.user.map(user => {
        const userInfo = {
            sku: this.sku = _.keys(_.get(user, 'sku')),
            roles: this.roles = _.keys(_.get(user, 'roles'))
        };
        console.log('userInfo', userInfo);
        return userInfo;
    }).subscribe()

    console.log('INfo', authService.user);
 } // End constructor

 ngOnInit(){};

 onLoginWithEmail():void {
     if (this.validateForm(this.email, this.password)) {
        this.authService.loginWithEmail(this.email, this.password)
        .then((loginRes) => {
            this.errorMessage = 'This Functionality is still in development. Checkback Soon.'
            // this.router.navigate(['']); // To Do Add a user page.
        }).catch(err => {
            this.error = err;
            console.error('Error on Login: ', err);
            this.router.navigate(['']);
        })
     }
 }

 validateForm(email: string, password: string):boolean {
     let validate = true;
        // Do more in the event it is false.
     return validate;
 }
}