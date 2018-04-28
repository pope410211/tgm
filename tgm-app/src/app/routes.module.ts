import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from '../app/components/main.component'
import { VendorSalesComponent } from "./components/vendor-sales.component";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: MainComponent, data: {title: 'Turtle Girls Market - Get Your Turtle On!'}},
	{path: 'vendor-sales', component: VendorSalesComponent, data: {title: 'TGM-Sales'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutesModule{
 public constructor () {}
}