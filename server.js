const express = require('express');
const morgan = require('morgan');

const accountRouter = require("./routes/accountRouter");

const server = express();

server.use(morgan());
server.use(express.json());


server.use("/api/accounts", accountRouter);

module.exports = server;