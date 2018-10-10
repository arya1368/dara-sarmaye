const express = require('express');

const app = express();
app.use(express.json());
require('./startUp/routes')(app);
require('./startUp/db.connection')();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
   console.log(`app is running on port ${port}`)
});

module.exports = server;
