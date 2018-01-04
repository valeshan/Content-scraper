const scrape = require('website-scraper');
const http = require('http');


const request = require('request');
const cheerio = require('cheerio');
let urls = [];



const xray = require('x-ray');
const x = xray();

const fs = require('fs');



function checkData(){
  const fs = require('fs');
  const dataFolder = './data';
  if(!fs.existsSync('./data')){
    //run something
    fs.mkdir(dataFolder);
  }
}

checkData();


// request('http://www.shirts4mike.com/shirts.php', function(err, resp, body){
//   if(!err && resp.statusCode === 200){
//     const $ = cheerio.load(body);
//     $('li a', '.products').each(function(){
//       const url = $(this).attr('href');
//       urls.push(url);
//     });
//     console.log(urls);
//   }
// })

// const options = {
//   method: "GET",
//   jar: true,
//   headers:
// }


//xray scrape from shirts site

//initially scrapes urls for each shirt
x('http://www.shirts4mike.com/shirts.php', '.products li', [{
  url : 'a@href',
}])(function(error, results){

  // for each of the items scraped, which would just contain the url, we use that to scrape again
  results.forEach(function(result, index){
    x(result.url, '.section', [{
      //inside each of the shirt urls we can get the price, img and details
      price: '.price',
      img: 'img@src',
      title: '.shirt-details h1'
    }])(function(error, results){
      //another forEach method to return each result object
      jsonFile = [];
      results.forEach(function(result, index){
        jsonFile.push(result);
      }).write('results.json')
    })
  });
})
