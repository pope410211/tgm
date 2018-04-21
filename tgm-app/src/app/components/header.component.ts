import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <nav class="navbar navbar-expand-lg sticky-top open-sans" id="b2cNavBar">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarToggle" aria-controls="navBarToggle" aria-expanded="false" aria-label="Toggle Navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navBarToggle">
                <a class="navbar-brand" href="#">
                    <img [src]="logoImagePath" width="30" height="30" alt="Turtle Girls Market Logo">
                </a>
                <span class="navbar-brand mb-01 h1 br-clr-wh">Turtle Girls Market</span>
                <ul class="navbar-nav ml-auto b2cLinkList">
                    <li class="nav-item b2cLinkItem">
                        <a class="nav-link b2cLink" href="#tgm">The Turlte Girls</a>
                    </li>
                    <li class="nav-item b2cLinkItem">
                        <a class="nav-link b2cLink" href="#about">About</a>
                    </li>
                    <li class="nav-item b2cLinkItem">
                        <a class="nav-link b2cLink" href="#gal">Gallery</a>
                    </li>
                    <li class="nav-item b2cLinkItem">
                        <a class="nav-link b2cLink">Vendor Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})

export class HeaderComponent implements OnInit{
    logoImagePath: string;

    public constructor() {
        this.logoImagePath = 'assets/logos/tgm_logo-WH.png'
    }

    ngOnInit() {}
    
}