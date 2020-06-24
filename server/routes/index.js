const express = require('express');
const app = express();

app.use(require('./v1/admin'));
app.use(require('./v1/adminAuth'));
app.use(require('./v1/brand'));
app.use(require('./v1/type'));
app.use(require('./v1/brandType'));
app.use(require('./v1/product'));
app.use(require('./v1/user'));
app.use(require('./v1/userAuth'));
app.use(require('./v1/ticket'));
app.use(require('./v1/ticketProduct'));
app.use(require('./v1/files'));

module.exports = app;