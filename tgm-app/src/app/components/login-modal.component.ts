import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.component';
import { Router } from '@angular/router';

@Component({
    selector: '<app-login></app-login>',
    templateUrl: '../pages/login-modal.component.html'
})

export class LoginModalComponent implements OnInit {
 email = '';
 password = '';
 errorMessage = '';
 error: {name: string, message: string} = {name: '', message: ''};

 constructor(
    public authService: AuthService,
    private router: Router
 ){} // End constructor

 ngOnInit(){};

 onLoginWithEmail():void {
     console.log('this.email & pass', this.email, this.password );
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