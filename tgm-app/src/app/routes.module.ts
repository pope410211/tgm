import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from '../app/components/main.component'

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: MainComponent, data: {title: 'Turtle Girls Market - Get Your Turtle On!'}},
    {path: 'login', component: MainComponent, data: {title: 'TGM-Vendor Login'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutesModule{
 public constructor () {}
}