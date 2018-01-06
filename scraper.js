//************ VARIABLES (INCL. REQUIREMENTS & DATE) ************//

//scraper module and shirts json file containing scraped data
const scrape = require('website-scraper');

const Promise = require('bluebird');
const request = require('request');
//fs
const fs = require('fs');

const cheerio = require('cheerio');
const $ = cheerio.load('')

//x-ray module
const xray = require('x-ray');
const x = xray();


//csv module that converts json to csv
const json2csv = require('json2csv');
//column titles for csv
const fields = ['Title', 'Price', 'ImgURL', 'URL', 'Date'];



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
    scraper();
  } else{
    console.log('folder already exists')
  }
}

checkData();

//************ SCRAPER & CRAWLER ************//


// scrapes data from site, other than URL, rest of options crawl to obtain values
// options are then written to shirts.json

// x('http://www.shirts4mike.com/shirts.php', '.products li', [{
//    URL : 'a@href',
//    ImgURL: x('a@href', 'img@src'),
//    Price: x('a@href', '.price'),
//    Title: x('a@href', '.shirt-details h1'),
//  }]).write('shirts.json')

function scraper(){

  let shirtPromise = new Promise(function(resolve, reject){
    x('http://www.shirts4mike.com/shirts.php', '.products li', [{
       URL : 'a@href',
       ImgURL: x('a@href', 'img@src'),
       Price: x('a@href', '.price'),
       Title: x('a@href', '.shirt-details h1'),
       Date: date
     }]).write('shirts.json');
  })


  shirtPromise.then(setTimeout(function(){
    request('http://www.shirts4mike.com/shirts.php', function(err, res, body){
      if(err){
        console.error(err.message);
      } else{
        const shirts = require('./shirts.json');
        let csv = json2csv({ data: shirts, fields: fields });

        //writing csv file, using date as name for csv, and   2 2 2checking for error
        fs.writeFile('data/'+ date +'.csv', csv, function(err) {
          if (err) throw err;
          console.log('file saved');
        });
      }
    })
  }, 5000)
  )


}




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
