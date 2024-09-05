const express = require('express');
const body_parser = require('body-parser');
const userRouter = require('./routers/user.router');
const walletRouter = require('./routers/wallet.router');

const app = express();

app.use(body_parser.json());

app.use('/',userRouter);
app.use('/',walletRouter);

module.exports = app;