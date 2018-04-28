import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// FireBase Specific
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
// Environment & Routes
import { environment } from '../environments/environment';
import { RoutesModule } from './routes.module';
// Components
import { AppComponent } from './app.component';
import { MainComponent } from '../app/components/main.component';
import { HeaderComponent } from '../app/components/header.component';
import { LoginModalComponent } from '../app/components/login-modal.component';
import { VendorSalesComponent } from '../app/components/vendor-sales.component';
import { FooterComponent } from '../app/components/footer.component';
// Services
import { AuthService } from '../app/services/auth-service.component';




@NgModule({
	imports: [
		BrowserModule,
		RoutesModule,
		FormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFireDatabaseModule
	],
	exports: [
		RoutesModule,
		AppComponent,
		MainComponent,
		HeaderComponent,
		LoginModalComponent,
		VendorSalesComponent,
		FooterComponent
	],
	declarations: [
		AppComponent,
		MainComponent,
		HeaderComponent,
		LoginModalComponent,
		VendorSalesComponent,
		FooterComponent
	],
	providers: [
		AuthService,
		AngularFireDatabase
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
