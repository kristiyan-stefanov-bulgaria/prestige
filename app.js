const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const sendAccountRouter = require('./routes/sendAccount');
const receiveAccountRouter = require('./routes/receiveAccountTEST');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/sendaccount', sendAccountRouter);
app.use('/api/customer/receive', receiveAccountRouter);

module.exports = app;