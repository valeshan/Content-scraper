//************ VARIABLES (INCL. REQUIREMENTS & DATE) ************//

//scraper module and shirts json file containing scraped data
const scrape = require('website-scraper');

const Promise = require('bluebird');

//fs
const fs = require('fs');

//x-ray module
const xray = require('x-ray');
const x = xray();


//csv module that converts json to csv
const json2csv = require('json2csv');
//column titles for csv
const fields = ['Title', 'Price', 'ImgURL', 'URL'];



//date for naming csv
const day = new Date().getDate();
const month = (new Date().getMonth()) + 1;
const year = new Date().getFullYear();
const date = `${year}-${month}-${day}`;

//************ DATA FOLDER ************//

//checks to see if data folder exists, if it doesn't exist, then data folder is created
function checkData(){
  const fs = require('fs');
  const dataFolder = './data';
  if(!fs.existsSync('./data')){
    //run something
    fs.mkdir(dataFolder);
  }
}

checkData();

//************ SCRAPER & CRAWLER ************//


// scrapes data from site, other than URL, rest of options crawl to obtain values
// options are then written to shirts.json

x('http://www.shirts4mike.com/shirts.php', '.products li', [{
   URL : 'a@href',
   ImgURL: x('a@href', 'img@src'),
   Price: x('a@href', '.price'),
   Title: x('a@href', '.shirt-details h1'),
 }])(function(err, obj) {
   console.log(err.message);
}).write('shirts.json');

setTimeout(function(){
  const shirts = require('./shirts.json');
  let csv = json2csv({ data: shirts, fields: fields });

  //writing csv file, using date as name for csv, and   2 2 2checking for error
  fs.writeFile('data/'+ date +'.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  })

}, 10000)





// let shirtPromise = function(){
//   return new Promise(function(resolve, reject){
//       x('http://www.shirts4mike.com/shirts.php', '.products li', [{
//          URL : 'a@href',
//          ImgURL: x('a@href', 'img@src'),
//          Price: x('a@href', '.price'),
//          Title: x('a@href', '.shirt-details h1'),
//        }]).write('shirts.json');
//   });
// };
//
//
// let csvPromise = function(){
//   return new Promise(function(resolve, reject){
//     resolve(
//       const shirts = require('./shirts.json');
//       let csv = json2csv({ data: shirts, fields: fields });
//       console.log('hello');
//
//       fs.writeFile('data/'+ date +'.csv', csv, function(err) {
//         if (err) throw err;
//         console.log('file saved');
//     )
//   })
// }
//
//
// shirtPromise.then(function(result){
//   return csvPromise(result);
// })
