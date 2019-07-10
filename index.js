const fetch = require("node-fetch");
var random_useragent = require('random-useragent');

/*client.getSymbols(response => {
    console.log(response);
}));*/
// Get the list of available symbols
 function getSymbols(cb){
    fetch("https://www.freeforexapi.com/api/live", {
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
            "User-Agent"   : random_useragent.getRandom() // gets a random user agent string
        })
        .then(res => res.json())
        .then(json => {
            //console.log(json);
            return cb(json.supportedPairs);
        })
        .catch(error => { 
            console.log(error.message);
         })
}

//['EURUSD', 'GBPJPY', 'AUDUSD']
// Get quotes for specified symbols:
function getQuotes(symbols, cb){
    //console.log(symbols.toString())
    fetch("https://www.freeforexapi.com/api/live?pairs=" + symbols.toString(), {
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
            "User-Agent"   : random_useragent.getRandom() // gets a random user agent string
        })
        .then(res => res.json())
        .then(json => {
            if(json.supportedPairs == undefined){
                if(json.code == 200){
                    //console.log(json.rates);
                    return cb(json.rates);
                }                
            }
            return cb({"error":"Pass correct pairs, check symbols first"});
        })
        .catch(error => { 
            console.log(error.message);
         })
}

// Convert from one currency to another:
/*client.convert('EUR', 'USD', 100, response => {
    console.log(response);
}));*/
function convert(symbols, cb){
    // not implimented yet
}

// Check if the market is open:
/*client.marketStatus((response => {
    //{marketOpen:true, market:london}
    //{marketOpen:false, market:closed}
}));*/
function marketStatus(cb){
    var time = convertToServerTimeZone(); //'7/10/2019, 7:15:22 AM'

    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    //sHours + ":" + sMinutes;

    var london = [3, 12 + 12];//["3 AM", "12 NOON"];
    var newyork = [8, 5 + 12];//["8 AM", "5 PM"];
    var sydney = [5 + 12, 2];//["5 PM", "2 AM"];
    var tokyo = [7 + 12, 4];//["7 PM", "4 AM"];
    
    var marketOpen = false;
    var market = "closed";

    if (sHours >= london[0] && sHours <= london[1]) {
        //London
        marketOpen = true;
        market = "london";
    }

    if (sHours >= newyork[0] && sHours <= newyork[1]) {
        //New York
        marketOpen = true;
        market = "newyork";
    }

    if (sHours >= sydney[0] && sHours <= sydney[1]) {
        //Sydney
        marketOpen = true;
        market = "sydney";
    }

    if (sHours >= tokyo[0] && sHours <= tokyo[1]) {
        //Tokyo
        marketOpen = true;
        market = "tokyo";
    }

   return cb({marketOpen:marketOpen, market:market});
}

/*
London – 3 AM through 12 noon Eastern time (~35% of total FX volume)

New York – 8 AM through 5 PM Eastern time (~20% of total FX volume)

Sydney – 5 PM through 2 AM Eastern time (~4% of total FX volume)

Tokyo – 7 PM through 4 AM Eastern time (~6% of total FX volume) 
*/

//convert server time to EST
/*client.convertToServerTimeZone((response => {
    //{marketOpen:true, market:london}
    //{marketOpen:false, market:closed}
}));*/
function convertToServerTimeZone(){
    var offset = -5.0 //EST
    var clientDate = new Date();
    var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
    var serverDate = new Date(utc + (3600000*offset));
    return serverDate.toLocaleString();
}

module.exports.getSymbols = getSymbols;
module.exports.getQuotes = getQuotes;
module.exports.convert = convert;
module.exports.marketStatus = marketStatus;