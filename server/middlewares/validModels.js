const { User, Brand, Product} = require('../../models');

const validateUser = async (req, res, next) => {
    let id = req.params.id;

    try {
        let user = await User.findByPk(id);
        if( !user ){
            return res.status(404).json({
                ok: false,
                err: { message: "No existe el registro" }
            })
        }

        req.userData = user;
        next();

    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: { message: error.message }
        })
    }

}

const validateBrand = async (req, res, next) => {
    let id = req.params.id;
    try {
        let brand = await Brand.findByPk(id);
        if( !brand ){
            return res.status(404).json({
                ok: false,
                err: { message: "No existe el registro" }
            })
        }

        req.brandData = brand;
        next();
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: { message: error.message }
        })
    }
}

const validateProduct = async (req, res, next) => {
    let id = req.params.id;
    try {
        let product = await Product.findByPk(id);
        if( !product ){
            return res.status(404).json({
                ok: false,
                err: { message: "No existe el registro" }
            })
        }

        req.productData = product;
        next();
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            err: { message: error.message }
        })
    }
}

module.exports = { validateBrand, validateProduct, validateUser };