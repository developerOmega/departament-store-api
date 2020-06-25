const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { port } = require('./config/config');
const app = express();
const fileUpload = require('express-fileupload');

/* body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(fileUpload({ useTempFiles: false }) );

/* public path */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(require('./routes/index'));
// adminRouter(app, admin);

app.listen(port, () => {
    console.log(`Conectado al puerto ${port}`);
})
