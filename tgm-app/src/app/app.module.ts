import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RoutesModule } from './routes.module';
// Components
import { AppComponent } from './app.component';
import { MainComponent } from '../app/components/main.component';
import { HeaderComponent } from '../app/components/header.component';
import { LoginModalComponent } from '../app/components/login-modal.component';
// Services
import { AuthService } from '../app/services/auth-service.component';



@NgModule({
  imports: [
    BrowserModule,
    RoutesModule,
    AngularFireModule,
    AngularFireAuthModule
  ],
  exports: [
    RoutesModule,
    AppComponent,
    MainComponent,
    HeaderComponent,
    LoginModalComponent
  ],
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LoginModalComponent
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
