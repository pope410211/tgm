import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.component';
import { AngularFireDatabase, AngularFireList }from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import * as _ from 'lodash';

@Component({
	selector: 'app-vendorSales',
	templateUrl: '../pages/vendor-sales.component.html'
})

export class VendorSalesComponent implements OnInit{
	currentPath: string;
	public vendorItems: Observable<any[]>;
	constructor(
		public authService: AuthService,
		private db: AngularFireDatabase,
	){
		console.log('authService', authService.authState, '\n', authService.user.next);

		const userSku = authService.user.subscribe({
			next: (v) => console.log('next info', v)
		})
		console.log('userSku', this.getSku());
		this.vendorItems = db.list('/productSales/baa').valueChanges();
		// this.vendorItems = temp;
		console.log('this-data', this.vendorItems);
		// // const data = this.fire.ref('productSales/').once('BAA').then(snapshot => {
		// // 	return snapshot;
		// // });
		// const data = db.list('productSales/', ref => ref.orderByChild('size').equalTo('large'));
		// 	// const data = db.list('productSales/');
		// console.log('data', data);
		// console.log('authService', authService.user.next);
	}//End Constructor
		getSku() {
			return this.authService.user.subscribe({
				next: (userInfo) => {return userInfo}
			})
		}
	ngOnInit() {
	}
} // End Class