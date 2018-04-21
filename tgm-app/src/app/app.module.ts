import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutesModule } from './routes.module';
import { AppComponent } from './app.component';
import { MainComponent } from '../app/components/main.component';
import { HeaderComponent } from '../app/components/header.component';

@NgModule({
  imports: [
    BrowserModule,
    RoutesModule,
  ],
  exports: [
    RoutesModule,
    AppComponent,
    MainComponent,
    HeaderComponent
  ],
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
