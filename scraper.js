function checkData(){
  const fs = require('fs');
  const dataFolder = './data';
  if(!fs.existsSync('./data')){
    //run something
    fs.mkdir(dataFolder);
  }
}

checkData();
