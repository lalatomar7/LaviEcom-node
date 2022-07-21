const express =  require("express");
const app = express()
const bodyParser = require('body-parser');

require("./db/conn");

const router = require('./api/router/router');

app.use(bodyParser.json());

app.use(router);

app.listen('8000', (req, res) =>{
    console.log("Done");
})