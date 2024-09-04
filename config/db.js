const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://yossy:UCm53aKnr9kzdtUj@cluster0.rj3m9.mongodb.net/lottoDB?retryWrites=true&w=majority')
  .on('open', () => {
    console.log("MongoDb Connected");
  })
  .on('error', () => {
    console.log("MongoDb Connection error");
  });

module.exports = connection;