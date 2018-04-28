import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template:`
        <footer class="footer b2cFooter" id="footer">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <ul class=" footer-list">
                            <li class=""><img class="logo-footer" src="{{logoImagePath}}" alt="TGM-Logo"/></li>
                        </ul>
                    </div>
                    <div class="col-auto">
                        <ul class="footer-list">
                            <li class="footer-link">
                                <div class="fb-like" data-href="https://turtlegirlsmarket.com" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>
                            </li>
                            <li class="footer-link">Contact Us</li>
                            <li class="footer-link">Vendor Login</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    `
})

export class FooterComponent {
    logoImagePath: string;

    constructor() {
        this.logoImagePath = 'assets/logos/tgm_logo-FC.png';
    }
}