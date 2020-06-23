const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { port } = require('./config/config');
// const sequelize = require('./database/database');
// const admin = require('./routes/admin');
// const admin = require('../models/admin');

const app = express();

/* body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* public path */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(require('./routes/v1/admin'));
app.use(require('./routes/v1/adminAuth'));
app.use(require('./routes/v1/brand'));
app.use(require('./routes/v1/type'));
app.use(require('./routes/v1/brandType'));
app.use(require('./routes/v1/product'));
app.use(require('./routes/v1/user'));
app.use(require('./routes/v1/userAuth'));
app.use(require('./routes/v1/ticket'));
app.use(require('./routes/v1/ticketProduct'));
// adminRouter(app, admin);

app.listen(port, () => {
    console.log(`Conectado al puerto ${port}`);
})