Works with freeforexapi.com, No API key needed.
Free Forex Ticker!

In order to prevent your site from being blacklisted, all you have to do is add the following linked image to your site next to where the rates are shown

```
<a href="https://www.freeforexapi.com">
    <img alt="Free Forex API" src="https://www.freeforexapi.com/Images/link.png" height="20">
</a>
```

```
freeForexAPI.getSymbols(res => {
    console.log(res.length); 
})    

freeForexAPI.getQuotes(['EURUSD', 'USDFRF', 'AUDUSD'], res => {           
    console.log(res); 
}) 

freeForexAPI.marketStatus(res => {
    console.log(res.marketOpen);          
}) 

conert.marketStatus("USDAUD", 10, res => {
    console.log(res);          
}) 
```

Test in test.js
```
mocha test.js
```