const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    Symbol: String,
    Name: String,
    LastSale: String,
    MarketCap: String,
    IPOyear: String,
    Secotr: String,
    Industry: String
})

mongoose.model('company', companySchema);