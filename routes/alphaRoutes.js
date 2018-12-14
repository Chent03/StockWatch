const alpha = require('../controller').alpha

module.exports = app => {
    app.get('/api/alpha/daily/', alpha.getDailyFeed);
}