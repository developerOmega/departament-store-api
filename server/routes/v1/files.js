const express = require('express');
const app = express();
const DropboxApi = require('../../dropbox/dropbox');
const { authUser, authAdmin } = require('../../middlewares/authJwt');
const { authUserId } = require('../../middlewares/authComponents');
const { validateExtension, validateFiles } = require('../../middlewares/validateFiles');
const { User, Brand, Product } = require('../../../models');


app.post('/api/v1/files/users/:id', [authUser, authUserId, validateFiles, validateExtension], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;    
    
    try {
        let user = await User.findByPk(id);
        if( !user ){
            return res.status(404).json({
                ok: false,
                err: { message: "No existe el registro" }
            })
        }

        let fileName = `${id}${Date.now()}${img}`;
        let path = `/users/${fileName}`;
        let contents = req.files.img.data;
    
        DropboxApi.on().upload(path, contents, (err, data) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err: { message: err.message }
                });
            }
            
            let dataPath = data.path_display;
            
            DropboxApi.on().sharedLink(dataPath, async (err, sharedLink) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err: {message: err.message}
                    }); 
                }

                user.img = user.imageUrl(sharedLink.url);
                await user.save();

                return res.json({
                    ok: true,
                    user,
                    message: "Se actualizo la imagen"
                });
            })
    
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: { message: error.message }
        })
    }

});

app.post('/api/v1/files/brands/:id', [authAdmin, validateFiles, validateExtension], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;    
    
    try {
        let brand = await Brand.findByPk(id);
        if( !brand ){
            return res.status(404).json({
                ok: false,
                err: { message: "No existe el registro" }
            })
        }

        let fileName = `${id}${Date.now()}${img}`;
        let path = `/brands/${fileName}`;
        let contents = req.files.img.data;
    
        DropboxApi.on().upload(path, contents, (err, data) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err: { message: err.message }
                });
            }
            
            let dataPath = data.path_display;
            
            DropboxApi.on().sharedLink(dataPath, async (err, sharedLink) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err: {message: err.message}
                    }); 
                }

                brand.img = brand.imageUrl(sharedLink.url);
                await brand.save();

                return res.json({
                    ok: true,
                    brand,
                    message: "Se actualizo la imagen"
                });
            })
    
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: { message: error.message }
        })
    }
});

app.post('/api/v1/files/products/:id', [authAdmin, validateFiles, validateExtension], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;    
    
    try {
        let product = await Product.findByPk(id);
        if( !product ){
            return res.status(404).json({
                ok: false,
                err: { message: "No existe el registro" }
            })
        }

        let fileName = `${id}${Date.now()}${img}`;
        let path = `/products/${fileName}`;
        let contents = req.files.img.data;
    
        DropboxApi.on().upload(path, contents, (err, data) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err: { message: err.message }
                });
            }
            
            let dataPath = data.path_display;
            
            DropboxApi.on().sharedLink(dataPath, async (err, sharedLink) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err: {message: err.message}
                    }); 
                }

                product.img = product.imageUrl(sharedLink.url);
                await product.save();

                return res.json({
                    ok: true,
                    product,
                    message: "Se actualizo la imagen"
                });
            })
    
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: { message: error.message }
        })
    }
});

app.put('/api/v1/files/users/:id', [authUser, authUserId, validateFiles, validateExtension], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;  
    
    try {
        let user = await User.findByPk(id);
        if( !user ){
            return res.status(404).json({
                ok: false,
                err: { message: "No existe el registro" }
            })
        }

        console.log(user);

    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: { message: error.message }
        })
    }

})



module.exports = app;
