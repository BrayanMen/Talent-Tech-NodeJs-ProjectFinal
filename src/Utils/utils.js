import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readFile = async(ruta)=>{
    const pathFile = path.join(__dirname,ruta);
    const data = await fs.readFile(pathFile,'utf-8') 
    return JSON.parse(data)
}
//     const errors = [];

//     if (!product.name || typeof product.name !== 'string') {
//         errors.push('Campo "name" faltante o inválido');
//     }

//     if (product.price === undefined || typeof product.price !== 'number' || isNaN(product.price)) {
//         errors.push('Campo "price" inválido');
//     }

//     if (product.stock === undefined || typeof product.stock !== 'number' || isNaN(product.stock)) {
//         errors.push('Campo "stock" inválido');
//     }

//     if (typeof product.available !== 'boolean') {
//         errors.push('Campo "available" debe ser booleano');
//     }

//     const arrayFields = ['images', 'tags', 'materials'];
//     for (const field of arrayFields) {
//         if (!Array.isArray(product[field])) {
//             errors.push(`Campo "${field}" no es un array`);
//         } else if (!product[field].every(el => typeof el === 'string' && el.trim() !== '')) {
//             errors.push(`Campo "${field}" tiene elementos no string o vacíos`);
//         }
//     }

//     if (product.releaseDate) {
//         const isDate = new Date(product.releaseDate).toString() !== 'Invalid Date';
//         if (!isDate) errors.push('Campo "releaseDate" inválido');
//     }

//     if (errors.length > 0) {
//         console.error(`❌ Producto con error en el índice [${index}] (${product.name}):`);
//         errors.forEach(err => console.error(`   - ${err}`));
//         return false;
//     }

//     return true;
// };