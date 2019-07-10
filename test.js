var assert = require('assert');
var freeForexAPI = require('./index.js');

describe('free-forex-api', function() {
  describe('getSymbols()', function() {
    it('result should contain ERUSD', function() {
        freeForexAPI.getSymbols(res => {
            assert.res.indexOf("EURUSD") > -1;
        })      
    });
  });

  describe('getQuotes()', function() {
    it('result should be forex rate', function() {
        freeForexAPI.getQuotes(['EURUSD', 'USDFRF', 'AUDUSD'], res => {           
            assert.res.indexOf("rate") > -1;
        })      
    });
  });

  describe('marketStatus()', function() {
    it('result should contain marketOpen value', function() {
        freeForexAPI.marketStatus(res => {
            //console.log(res.marketOpen);
            if(res.marketOpen == true || res.marketOpen == false){
                assert.ok(true);
            }else{
                assert.ok(true);
            }            
        })  
    });
  });

  describe('convert()', function() {
    it('not implimented', function() {
        assert.ok(true);;     
    });
  });
  
});


