import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <nav class="navbar navbar-expand-lg sticky-top" id="b2cNavBar">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarToggle" aria-controls="navBarToggle" aria-expanded="false" aria-label="Toggle Navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navBarToggle">
                <span class="navbar-brand mb-01 h1">Turtle Girls Market</span>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#tgm">The Turlte Girls</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#gal">Gallery</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Vendor Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})

export class HeaderComponent {}