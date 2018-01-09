//************ VARIABLES (INCL. REQUIREMENTS & DATE) ************//

//scraper module and shirts json file containing scraped data

//fs
const fs = require('fs');

//http
const http = require('http');

//request
const request = require('request');

//x-ray module
const xray = require('x-ray');
const x = xray();


//csv module that converts json to csv
const json2csv = require('json2csv');
//column titles for csv
const fields = ['Title', 'Price', 'ImgURL', 'URL', 'Time'];



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
    //create folder & run scraper
    fs.mkdir(dataFolder);
    scraper();
  } else{
    scraper();
  }
}

checkData();

//************ SCRAPER & CRAWLER ************//


function scraper(){

  // scrapes data from site, crawling for rest of options to obtain values
  x("http://www.shirts4mike.com/shirts.php", ".products li", [
        {
            URL: "a@href",
            ImgURL: x("a@href", "img@src"),
            Price: x("a@href", ".price"),
            Title: x("a@href", ".shirt-details h1"),
        }
    ])((err, obj) => {
      if(!err){
        //adding date to each item and editing title to remove price
        for(let i= 0; i <= 7; i++){
          obj[i].Title = obj[i].Title.slice(4);
          obj[i].Time = new Date();
        }
      let csv = json2csv({ data: obj, fields: fields });

      //writing csv file, using date as name for csv, and checking for error
      fs.writeFile('data/'+ date +'.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
      });
      } else{
        console.log(err.message)
      }
    });
}


http.request("http://www.shirts4mike.com/shirts.php").on('error', function(error){
  console.error(error.message);
})
