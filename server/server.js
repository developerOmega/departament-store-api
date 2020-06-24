const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { port } = require('./config/config');
const DropboxApi = require('./dropbox/dropbox');
const app = express();

const fileUpload = require('express-fileupload');
// const multer = require('multer');
// var upload = multer();

/* body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(fileUpload({ useTempFiles: false }) );

/* public path */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(require('./routes/index'));
// adminRouter(app, admin);

app.post('/dropbox/upload', (req, res) => {
    DropboxApi.on().dbx.filesUpload({
        path: `/file/${req.files.image.name}`,
        contents: req.files.image.data
    })
    .then( response => res.send(response    ))
    .catch( error => res.send(error) );
});


app.post('/dropbox/shered-link', (req, res) => {
    DropboxApi.on().dbx.sharingCreateSharedLinkWithSettings({path: '/file/cubit.jpeg'})
        .then(response => res.send(response))
        .catch(error => res.send(error));
})

app.delete('/dropbox/delete', (req, res) => {
    // console.log(DropboxApi.on().dbx);
    DropboxApi.on().dbx.filesDelete({path: '/file/cubit.jpeg'})
        .then(response => res.send(response))
        .catch(error => res.send(error));
})

app.listen(port, () => {
    console.log(`Conectado al puerto ${port}`);
})
