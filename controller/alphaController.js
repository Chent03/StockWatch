const keys = require('../config/keys');
const axios = require('axios');

const Stocks = require('../services/Stocks');


module.exports = {
    async getDailyFeed(req, res) {
        const stocks = new Stocks;
        let symb = req.query.sym
        try {
            let stock = await stocks.getSymbol(symb);
            let feed = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symb}&apikey=${keys.alphaAPIKEY}`);
            feed = feed.data['Time Series (Daily)'];
            const feedArray = [];
            for(let item in feed) {
                let feedObj = {
                    open: feed[item]['1. open'],
                    high: feed[item]['2. high'],
                    low: feed[item]['3. low'],
                    close: feed[item]['4. close'],
                    volume: feed[item]['5. volume'],
                    date: item
                }
                feedArray.push(feedObj);
            }
            res.status(200).send({
                company: stock,
                priceFeed: feedArray
            });
        } catch(e) {
            res.status(400).send(e);
        }
    }
}