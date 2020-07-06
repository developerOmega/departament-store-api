const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const path = require('path');
const { port } = require('./config/config');
const app = express();
const fileUpload = require('express-fileupload');

/* body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(fileUpload({ useTempFiles: false }) );

// Use this after the variable declaration
app.use(cors()); 

/* public path */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(require('./routes/index'));
// adminRouter(app, admin);


app.listen(port, () => {
    console.log(`Conectado al puerto ${port}`);
})
