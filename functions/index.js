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

            promises.push(admin.database().ref('productSales/' + sku).push({
                item: itemsSoldArray[i].notes, 
                price: itemsSoldArray[i].gross_sales_money.amount,
                qty: itemsSoldArray[i].quantity,
                date: yesterdayDate.toISOString()
            }));
          } // End For Loop
          return Promise.all(promises).then(() => {
            return res.status(200).end();
          }).catch((err) => {console.error('Err in Promise Array: \n', err); res.end(); });
      }).catch((err) => {console.error('Promise Rejected: ', err).end();});
});