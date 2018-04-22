import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	template: `
		<nav class="navbar navbar-expand-md sticky-top open-sans" id="b2cNavBar">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarToggle" aria-controls="navBarToggle" aria-expanded="false" aria-label="Toggle Navigation">
				<span class="br-clr-wh oi oi-menu"></span>
			</button>
			<div class="collapse navbar-collapse" id="navBarToggle">
			<a class="navbar-brand" href="#">
				<img [src]="logoImagePath" width="30" height="30" alt="Turtle Girls Market Logo">
			</a>
			<span class="navbar-brand mb-01 h1 br-clr-wh">Turtle Girls Market</span>
			<div class="fb-like" data-href="https://turtlegirlsmarket.com" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>                
				<ul class="navbar-nav ml-auto b2cLinkList">
					<li class="nav-item b2cLinkItem">
						<a class="nav-link b2cLink" (click)="scroll('#tgm')">The Turtle Girls</a>
					</li>
					<li class="nav-item b2cLinkItem">
						<a class="nav-link b2cLink" (click)="scroll('#about')">About</a>
					</li>
					<!-- <li class="nav-item b2cLinkItem">
						<a class="nav-link b2cLink" (click)="scroll('#gal')">Gallery</a>
					</li> -->
					<li class="nav-item b2cLinkItem">
						<a class="nav-link b2cLink" data-toggle="modal" data-target="#loginModal">Vendor Login</a>
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
	scroll(id) {
		const element = document.querySelectorAll(id); 
		const el = element[0] as HTMLElement
		el.scrollIntoView({behavior: "smooth"});
	} // End scroll fn
	ngOnInit() {}

}