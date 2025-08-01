import {
    createProductService,
    deleteProductService,
    getAllProductsService,
    getProductsByIdService,
    searchProductsByNameService,
    updateProductService,
} from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
    const { category, available, minPrice, maxPrice, limitDoc, startDocID } = req.query;
    try {
        const products = await getAllProductsService({
            category: category || null,
            available: available === 'true' ? true : available === 'false' ? false : null,
            minPrice: minPrice ? Number(minPrice) : null,
            maxPrice: maxPrice ? Number(maxPrice) : null,
            limitDoc: limitDoc ? parseInt(limitDoc) : null,
            startDocID: startDocID || null,
        });
        if (!products.success) {
            return res.status(404).json({
                success: false,
                message: products.message,
                error: products.error,
                status: 404,
            });
        }
        res.status(200).json({
            success: true,
            message: products.message,
            data: products.data,
            count: products.data.length,
            lastProduct: products.nextPage,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductsByIdService(id);
        if (!product.success) {
            return res.status(404).json({
                success: false,
                message: product.message,
                error: product.error,
                status: 404,
            });
        }
        res.status(200).json({
            success: true,
            message: product.message,
            data: product.data,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};

export const searchProductsByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(404).json({
                success: false,
                message: 'Error al pasar el parametro "name"',
            });
        }
        const search = await searchProductsByNameService(name);
        if (!search.success) {
            return res.status(404).json({
                success: false,
                message: search.error,
            });
        }
        res.status(200).json(search.data);
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await createProductService(productData);
        if (!newProduct.success) {
            return res.status(400).json({
                success: false,
                message: newProduct.message,
                error: newProduct.error,
            });
        }
        res.status(201).json({
            success: true,
            message: newProduct.message,
            data: newProduct.data,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const dataProduct = req.body;
        const productUpdate = await updateProductService(id, dataProduct);
        if (!productUpdate.success)
            return res.status(404).json({
                success: false,
                message: productUpdate.message,
                error: productUpdate.error,
            });
        res.status(200).json({
            success: true,
            message: 'Producto modificado con exito',
            data: productUpdate.data,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteProductService(id);
        if (!deleted.success) {
            return res.status(404).json({
                success: false,
                message: deleted.message,
                error: deleted.error,
                status: 404,
            });
        }
        res.status(200).json({
            success: true,
            message: deleted.message,
            data: deleted.data,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};
