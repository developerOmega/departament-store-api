const express = require('express');
const app = express();
const DropboxApi = require('../../dropbox/dropbox');
const { authUser, authAdmin } = require('../../middlewares/authJwt');
const { authUserId } = require('../../middlewares/authComponents');
const { validateFiles } = require('../../middlewares/validateFiles');
const { validateUser, validateBrand, validateProduct } = require('../../middlewares/validModels');

app.post('/api/v1/files/users/:id', [authUser, authUserId, validateFiles, validateUser],  async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;    
    
    let fileName = `${id}${Date.now()}${img}`;
    let path = `/users/${fileName}`;
    let contents = req.files.img.data;
    
    DropboxApi.on().upload(path, contents, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                err
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

            req.userData.img = req.userData.imageUrl(sharedLink.url);
            await req.userData.save();

            return res.json({
                ok: true,
                user: req.userData,
                message: "Se actualizo la imagen"
            });
        })
    
    });

});

app.post('/api/v1/files/brands/:id', [authAdmin, validateFiles, validateBrand], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;    

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

            req.brandData.img = req.brandData.imageUrl(sharedLink.url);
            await req.brandData.save();

            return res.json({
                ok: true,
                brand: req.brandData,
                message: "Se actualizo la imagen"
            });
        })
    
    });
});

app.post('/api/v1/files/products/:id', [authAdmin, validateFiles, validateProduct], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;    

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

            req.productData.img = req.productData.imageUrl(sharedLink.url);
            await req.productData.save();

            return res.json({
                ok: true,
                product: req.productData,
                message: "Se actualizo la imagen"
            });
        })
    
    });
});

app.put('/api/v1/files/users/:id', [authUser, authUserId, validateFiles, validateUser], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;  

    if(req.userData.img === '' || !req.userData.img ){
        return res.status(400).json({
            ok: false,
            err: { message: "El usuario aún no cuenta con una imagen" }
        })
    } 

    let cutImg = req.userData.img.split('/');
    let fileName = cutImg[cutImg.length - 1];
    let path = `/users/${fileName}`;

    DropboxApi.on().delete(path, (err, response) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        fileName = `${id}${Date.now()}${img}`;
        path = `/users/${fileName}`;
        let contents = req.files.img.data;

        DropboxApi.on().upload(path, contents, (err, data) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
                
            let dataPath = data.path_display;
                
            DropboxApi.on().sharedLink(dataPath, async (err, sharedLink) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    }); 
                }

            req.userData.img = req.userData.imageUrl(sharedLink.url);
            await req.userData.save();
            
                return res.json({
                    ok: true,
                    user: req.userData,
                    message: "Se actualizo la imagen"
                });
            })

        });
    })

});

app.put('/api/v1/files/brands/:id', [authAdmin, validateFiles, validateBrand], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;  

    if(req.brandData.img === '' || !req.brandData.img ){
        return res.status(400).json({
            ok: false,
            err: { message: "El usuario aún no cuenta con una imagen" }
        })
    } 

    let cutImg = req.brandData.img.split('/');
    let fileName = cutImg[cutImg.length - 1];
    let path = `/brands/${fileName}`;

    DropboxApi.on().delete(path, (err, response) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        fileName = `${id}${Date.now()}${img}`;
        path = `/brands/${fileName}`;
        let contents = req.files.img.data;

        DropboxApi.on().upload(path, contents, (err, data) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            let dataPath = data.path_display;
            DropboxApi.on().sharedLink(dataPath, async (err, sharedLink) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    }); 
                }
    
                req.brandData.img = req.brandData.imageUrl(sharedLink.url);
                await req.brandData.save();
    
                return res.json({
                    ok: true,
                    brand: req.brandData,
                    message: "Se actualizo la imagen"
                });
            });
    
        });
    });

});

app.put('/api/v1/files/products/:id', [authAdmin, validateFiles, validateProduct], async (req, res) => {
    let id = req.params.id;
    let img = req.files.img.name;  

    if(req.productData.img === '' || !req.productData.img ){
        return res.status(400).json({
            ok: false,
            err: { message: "El usuario aún no cuenta con una imagen" }
        })
    } 

    let cutImg = req.productData.img.split('/');
    let fileName = cutImg[cutImg.length - 1];
    let path = `/products/${fileName}`;

    DropboxApi.on().delete(path, (err, response) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        fileName = `${id}${Date.now()}${img}`;
        path = `/products/${fileName}`;
        let contents = req.files.img.data;

        DropboxApi.on().upload(path, contents, (err, data) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            let dataPath = data.path_display;
            DropboxApi.on().sharedLink(dataPath, async (err, sharedLink) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    }); 
                }
    
                req.productData.img = req.productData.imageUrl(sharedLink.url);
                await req.productData.save();
    
                return res.json({
                    ok: true,
                    product: req.productData,
                    message: "Se actualizo la imagen"
                });
            });
    
        });
    });

});

app.delete('/api/v1/files/users/:id', [authUser, authUserId, validateUser], async (req, res) => {

    if(req.userData.img === '' || !req.userData.img ){
        return res.status(400).json({
            ok: false,
            err: { message: "El usuario aún no cuenta con una imagen" }
        })
    } 

    let cutImg = req.userData.img.split('/');
    let fileName = cutImg[cutImg.length - 1];
    let path = `/users/${fileName}`;

    DropboxApi.on().delete(path, async (err, response) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        req.userData.img = '';
        await req.userData.save();

        return res.json({
            ok: true,
            message: "La imagen se elimino con exito",
            data: response
        });
    });
});

app.delete('/api/v1/files/brands/:id', [authAdmin, validateBrand], async (req, res) => {

    if(req.brandData.img === '' || !req.brandData.img ){
        return res.status(400).json({
            ok: false,
            err: { message: "El usuario aún no cuenta con una imagen" }
        })
    } 

    let cutImg = req.brandData.img.split('/');
    let fileName = cutImg[cutImg.length - 1];
    let path = `/brands/${fileName}`;

    DropboxApi.on().delete(path, async (err, response) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        req.brandData.img = '';
        await req.brandData.save();

        return res.json({
            ok: true,
            message: "La imagen se elimino con exito",
            data: response
        });
    });
});

app.delete('/api/v1/files/products/:id', [authAdmin, validateProduct], async (req, res) => {

    if(req.productData.img === '' || !req.productData.img ){
        return res.status(400).json({
            ok: false,
            err: { message: "El usuario aún no cuenta con una imagen" }
        })
    } 

    let cutImg = req.productData.img.split('/');
    let fileName = cutImg[cutImg.length - 1];
    let path = `/products/${fileName}`;

    DropboxApi.on().delete(path, async (err, response) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        req.productData.img = '';
        await req.productData.save();

        return res.json({
            ok: true,
            message: "La imagen se elimino con exito",
            data: response
        });
    });
});

module.exports = app;
