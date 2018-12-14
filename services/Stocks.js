const mongoose = require('mongoose');
const NewsAPI = require('newsapi');
const keys = require('../config/keys');

const newsapi = new NewsAPI(keys.newsAPIKEY);
const Company = mongoose.model('company');



class Stocks {
    constructor(){}

    async getSymbol(sym) {
        try {
            console.log(sym);
            let com = await Company.findOne({Symbol: sym})
            if(com) {
                let news = await this.getNews(com.Name);
                com = Object.assign({}, com._doc);
                com.news = news.articles;
            }
            return com;
        } catch(e) {
            console.log(e);
        }
    }

    async getNews(companyName) {
        try {
            let news = await newsapi.v2.everything({
                q: companyName,
                language: 'en'
            })
            return news;
        } catch(e) {
            console.log('err', e)
        }
    }
}


module.exports = Stocks;