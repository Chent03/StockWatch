let fs = require('fs');
let fastcsv = require('fast-csv');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/Company');

mongoose.connect(keys.mongoURI);

let readableStreamInput = fs.createReadStream('./companylist.csv');
const Company = mongoose.model('company');



fastcsv
    .fromStream(readableStreamInput, {headers: true})
    .on('data', async (data) => {
        const {Symbol, Name, LastSale, MarketCap, IPOYear, Sector, industry } = data;
        const company = new Company({
            Symbol,
            Name,
            LastSale,
            MarketCap,
            IPOYear,
            Sector,
            Industry: industry
        })

        try{
            await company.save();
        } catch(e) {
            console.log(e);
        }

    }).on('end', () => {
        console.log('its done');
    })