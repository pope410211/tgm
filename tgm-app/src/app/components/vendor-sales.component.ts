import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.component';

@Component({
	selector: 'app-vendorSales',
	templateUrl: '../pages/vendor-sales.component.html'
})

export class VendorSalesComponent {
 
	constructor(
		public authService: AuthService
	){
		console.log('authService', authService.user.next);
	}//End Constructor
} // End Class