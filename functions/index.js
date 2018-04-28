const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount');
const https = require('https');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://turtlegirlsmarket-64f1c.firebaseio.com'
});

exports.updateSales = functions.https.onRequest((req, res) => {
    const apiKey = functions.config().tgmconfig.apikey;
    const locId = functions.config().tgmconfig.storeid;
    const baseUrl = 'connect.squareup.com';
    const path = '/v1/' + locId + '/payments?';
    const requestHeaders = {
        'Authorization': 'Bearer ' + apiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
    let reqBody = {host: baseUrl, headers: requestHeaders, path: '', method: 'GET'};
    var todaysDate = new Date();
    var yesterdayDate = new Date();
    yesterdayDate.setDate(todaysDate.getDate()-1);

    // Custom Promise
    let remoteCalls = function(urlOptions) {
        return new Promise(((resolve, reject) => {
          let makeCall = https.request(urlOptions, (response) => {
            if (response.statusCode !== 200) {
              reject(new Error('Status Code:' + response.statusCode));
            }
            let body = [];
            response.on('data', (info) => {
              body.push(info);
            });
            response.on('end', () => {
              resolve(body.join(''));
            });
          });
          makeCall.on('error', (err) => {
            reject(err);
          });
          makeCall.end();
        }));
      }; // end remoteCalls()

      let reqPath = path + 'begin_time=' + yesterdayDate.toISOString() + '&end_time=' + todaysDate.toISOString();
      reqBody.path = reqPath;
      return remoteCalls(reqBody).then((sqRes) => {
        const dailyTrans = JSON.parse(sqRes);
        let itemsSoldArray = [];
        for (var i = 0; i < dailyTrans.length; i++) {
            for (var t = 0; t < dailyTrans[i].itemizations.length; t++) {
              const transactionDate = dailyTrans[i].created_at;
              dailyTrans[i].itemizations[t].saleDate = transactionDate;
              itemsSoldArray.push(dailyTrans[i].itemizations[t]);
            }
          }

          let promises = [];

          for (let i = 0; i < itemsSoldArray.length; i++) {
            const sku = itemsSoldArray[i].item_detail.sku;
            const tmpItem = itemsSoldArray[i];
            if(tmpItem.notes === undefined || tmpItem.notes === null) {
                tmpItem.notes = 'Item Info Not Entered';
            }
            const saleDate = itemsSoldArray[i].saleDate;
            const notes = itemsSoldArray[i].notes;
            const childID = i + ':' + sku + ':' + saleDate.toString().replace(/[. \n # $ [ \] ? ( )]/g, '');
            promises.push(admin.database().ref('productSales/' + sku).child(childID).set({
                item: itemsSoldArray[i].notes, 
                price: itemsSoldArray[i].gross_sales_money.amount,
                qty: itemsSoldArray[i].quantity,
                date: saleDate
            }));
          } // End For Loop
          return Promise.all(promises).then(() => {
            return res.status(200).end();
          }).catch((err) => {console.error('Err in Promise Array: \n', err); res.end(); });
      }).catch((err) => {console.error('Promise Rejected: ', err);});
});


exports.updateSalesForMonth = functions.https.onRequest((req, res) => {
	try {
		const apiKey = functions.config().tgmconfig.apikey;
		const locId = functions.config().tgmconfig.storeid;
		const baseUrl = 'connect.squareup.com';
		const path = '/v1/' + locId + '/payments?';
		const requestHeaders = {
			'Authorization': 'Bearer ' + apiKey,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
		let month = 25;
		let newMonth = 24;
		let reqBody = {host: baseUrl, headers: requestHeaders, path: '', method: 'GET'};
		var todaysDate = new Date();
		var prevMonth = new Date();
		var toMonth = new Date();
		prevMonth.setDate(todaysDate.getDate()-month);
		toMonth.setDate(todaysDate.getDate()-newMonth);

		// Custom Promise
		let remoteCalls = function(urlOptions) {
			return new Promise(((resolve, reject) => {
				let makeCall = https.request(urlOptions, (response) => {
					if (response.statusCode !== 200) {
						reject(new Error('Status Code:' + response.statusCode));
					}
					let body = [];
					response.on('data', (info) => {
						body.push(info);
					});
					response.on('end', () => {
						resolve(body.join(''));
					});
				});
					makeCall.on('error', (err) => {
						reject(err);
					});
				makeCall.end();
			}));
		}; // end remoteCalls()
		let monthPromise = [];
		while (toMonth.getDate() !== todaysDate.getDate()) {
			let reqPath = path + 'begin_time=' + prevMonth.toISOString() + '&end_time=' + toMonth.toISOString();
			reqBody.path = reqPath;

			month = month - 1;
			newMonth = newMonth -1;
			let newDate = new Date();
			let newToDay = new Date();
			toMonth.setDate(todaysDate.getDate()-newMonth);
			newDate.setDate(todaysDate.getDate()-month);
			prevMonth = newDate;
			monthPromise.push(remoteCalls(reqBody).then((sqRes) => {
				const dailyTrans = JSON.parse(sqRes);
				let itemsSoldArray = [];
				for (var i = 0; i < dailyTrans.length; i++) {
					for (var t = 0; t < dailyTrans[i].itemizations.length; t++) {
						const transactionDate = dailyTrans[i].created_at;
						dailyTrans[i].itemizations[t].saleDate = transactionDate;
						itemsSoldArray.push(dailyTrans[i].itemizations[t]);
					}
				}
				let promises = [];
		
				for (let i = 0; i < itemsSoldArray.length; i++) {
					const sku = itemsSoldArray[i].item_detail.sku;
					const tmpItem = itemsSoldArray[i];
					if(tmpItem.notes === undefined || tmpItem.notes === null) {
						tmpItem.notes = 'Item Info Not Entered';
					}
					const saleDate = itemsSoldArray[i].saleDate;
					const notes = itemsSoldArray[i].notes;
					const childID = i + ':' + sku + ':' + saleDate.toString().replace(/[. \n # $ [ \] ? ( )]/g, '');
					promises.push(admin.database().ref('productSales/' + sku).child(childID).set({
						item: itemsSoldArray[i].notes, 
						price: itemsSoldArray[i].gross_sales_money.amount,
						qty: itemsSoldArray[i].quantity,
						date: saleDate
					}));
				} // End For Loop
				return Promise.all(promises);
			}).catch((err) => {console.error('Promise Rejected: ', err);}));
		}

		return Promise.all(monthPromise).then((res) => {
			return res.status(200).end();
		}).catch((e) => {
			console.error(e);
		});
	} catch(e) {
		console.error('Month Sales', e);
		return status(500).end();
	}

});


exports.updateSpecificDay = functions.https.onRequest((req, res) => {
    const apiKey = functions.config().tgmconfig.apikey;
    const locId = functions.config().tgmconfig.storeid;
    const baseUrl = 'connect.squareup.com';
    const path = '/v1/' + locId + '/payments?';
    const requestHeaders = {
        'Authorization': 'Bearer ' + apiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
    let reqBody = {host: baseUrl, headers: requestHeaders, path: '', method: 'GET'};
	let todaysDateOne = new Date();
	let todaysDateTwo = new Date();
	let fromDate = new Date();
	let toDate = new Date();
	let fromDay = req.query.fday;
	let toTheDay = req.query.tday;
	console.log(toTheDay, fromDay);
	console.log('reqUERY', req.query);
	fromDate.setDate(todaysDateOne.getDate()-fromDay);
	toDate.setDate(todaysDateTwo.getDate()-toTheDay);

    // Custom Promise
    let remoteCalls = function(urlOptions) {
        return new Promise(((resolve, reject) => {
          let makeCall = https.request(urlOptions, (response) => {
            if (response.statusCode !== 200) {
              reject(new Error('Status Code:' + response.statusCode));
            }
            let body = [];
            response.on('data', (info) => {
              body.push(info);
            });
            response.on('end', () => {
              resolve(body.join(''));
            });
          });
          makeCall.on('error', (err) => {
            reject(err);
          });
          makeCall.end();
        }));
	  }; // end remoteCalls()
	  console.log('dates1: \n From- ', fromDate, '\n To- ', toDate);
console.log('Dates:\n From-', fromDate.toISOString(), '\n To-', toDate.toISOString());
      let reqPath = path + 'begin_time=' + fromDate.toISOString() + '&end_time=' + toDate.toISOString();
	  reqBody.path = reqPath;
	  console.log('reqBody', reqBody);
      return remoteCalls(reqBody).then((sqRes) => {
        const dailyTrans = JSON.parse(sqRes);
        let itemsSoldArray = [];
        for (let i = 0; i < dailyTrans.length; i++) {
            for (let t = 0; t < dailyTrans[i].itemizations.length; t++) {
              const transactionDate = dailyTrans[i].created_at;
              dailyTrans[i].itemizations[t].saleDate = transactionDate;
              itemsSoldArray.push(dailyTrans[i].itemizations[t]);
            }
          }

          let promises = [];

          for (let i = 0; i < itemsSoldArray.length; i++) {
            const sku = itemsSoldArray[i].item_detail.sku;
            const tmpItem = itemsSoldArray[i];
            if(tmpItem.notes === undefined || tmpItem.notes === null) {
                tmpItem.notes = 'Item Info Not Entered';
            }
            const saleDate = itemsSoldArray[i].saleDate;
            const notes = itemsSoldArray[i].notes;
            const childID = i + ':' + sku + ':' + saleDate.toString().replace(/[. \n # $ [ \] ? ( )]/g, '');
            promises.push(admin.database().ref('productSales/' + sku).child(childID).set({
                item: itemsSoldArray[i].notes, 
                price: itemsSoldArray[i].gross_sales_money.amount,
                qty: itemsSoldArray[i].quantity,
                date: saleDate
            }));
          } // End For Loop
          return Promise.all(promises).then(() => {
            return res.status(200).end();
          }).catch((err) => {console.error('Err in Promise Array: \n', err); res.end(); });
      }).catch((err) => {console.error('Promise Rejected: ', err);});
});
