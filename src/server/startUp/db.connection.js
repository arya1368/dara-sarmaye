const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://localhost/dara-sarmaye')
      .then(() => console.log("connected to dara-sarmaye db"))
};
