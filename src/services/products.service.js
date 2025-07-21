import {
    createProductsDB,
    getAllProductsDB,
    getProductsByIdDB,
    searchProductsByNameDB,
} from '../models/products.model.js';

export const getAllProductsService = async (querys = {}) => {
    try {
        const { products, lastProducts } = await getAllProductsDB(querys);
        return {
            success: true,
            message: 'Productos obtenidos con exito',
            data: products,
            nextPage: lastProducts,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al obtener productos ',
            error: error.message,
        };
    }
};

export const getProductsByIdService = async id => {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID requerido',
                message: 'Debe proporcionar un ID valido',
            };
        }
        const { product } = await getProductsByIdDB(id);
        if (!product) {
            return {
                success: false,
                error: 'Producto no encontrado',
                message: `No se encontro un producto por el ID: ${id}`,
            };
        }
        return {
            success: true,
            message: 'Producto obtenido con exito',
            data: product,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al obtener el producto',
            error: error.message,
        };
    }
};

export const createProductService = async productData => {
    try {
        if (!productData.name || !productData.price) {
            return {
                success: false,
                error: 'Datos incompletos',
                message: 'Completar campos obligatorios (Nombre y Precio)',
            };
        }
        if (isNaN(productData.price) || productData.price < 0) {
            return {
                success: false,
                error: 'Precio invalido',
                message: 'Precio debe ser mayor a 0',
            };
        }
        const productFormat = {
            name: productData.name.trim(),
            category: productData.category || 'Sin categoria',
            subcategory: productData.subcategory || '',
            description: productData.description?.trim() || '',
            price: parseFloat(productData.price),
            stock: parseInt(productData.stock),
            available:
                productData.available === true
                    ? true
                    : productData.available === false
                    ? false
                    : true,
            images: productData.images || [],
            tags: productData.tags || [],
            materials: productData.materials || [],
        };
        const newProduct = await createProductsDB(productFormat);
        return {
            success: true,
            message: 'Producto creado con exito',
            data: newProduct,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al crear el producto',
            error: error.message,
        };
    }
};

export const searchProductsByNameService = async name => {
    try {
        const search = await searchProductsByNameDB(name);
        return {
            success: true,
            message: 'Producto encontrado',
            data: search,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error en búsqueda',
            error: error.message,
        };
    }
};
