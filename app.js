const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const sendAccountRouter = require('./routes/api/sendAccount');
const receiveAccountRouter = require('./routes/api/receiveAccountTEST');
const customAPI = require('./routes/api/customAPI');
const licenseRouter = require('./routes/api/customAPI/license');
const logicProfiles = require('./routes/api/customAPI/logicProfiles');
const eventsRouter = require('./routes/api/customAPI/events');
const storageProfilesRouter = require('./routes/api/customAPI/storageProfiles');
const graphRouter = require('./routes/api/customAPI/graphs');
const cloudRouter = require('./routes/api/customAPI/cloud');

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
app.use('/api/customAPI/license', licenseRouter);
app.use('/api/customAPI/logicProfiles', logicProfiles);
app.use('/api/customAPI/events', eventsRouter);
app.use('/api/customAPI/storageProfiles', storageProfilesRouter);
app.use('/api/customAPI/graphs', graphRouter);
app.use('/api/customAPI/cloud', cloudRouter);

module.exports = app;