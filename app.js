const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const sendAccountRouter = require('./routes/api/sendAccount');
const receiveAccountRouter = require('./routes/api/receiveAccountTEST');
const customAPI = require('./routes/api/customAPI');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/sendaccount', sendAccountRouter);
app.use('/api/customer/receive', receiveAccountRouter);
app.use('/api/customAPI', customAPI);

module.exports = app;