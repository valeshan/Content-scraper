## Content scraper

This is a Node.js command line application that scrapes content from a site (http://shirts4mike.com) and adds them into a csv file which is named by the date in which it was saved(e.g. 2018-07-01.csv). 

The content is scraped from an ecommerce site and selects the item name, url, time and prices then tabulates them in a csv file and saves them in a folder labeled ```data```. 

## Installation:
First run ```npm install``` to install required dependencies then run ```npm start``` to start the application. 


## Note: 
If the program is run multiple times, the previous csv file is overridden to provide current data and renamed to the current date.
