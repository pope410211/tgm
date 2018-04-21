import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutesModule } from './routes.module';
import { AppComponent } from './app.component';
import { MainComponent } from '../app/components/main.component';

@NgModule({
  imports: [
    BrowserModule,
    RoutesModule,
  ],
  exports: [
    RoutesModule,
    AppComponent,
    MainComponent
  ],
  declarations: [
    AppComponent,
    MainComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
