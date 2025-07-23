import { getAllUsersDB } from '../models/users.model.js';

export const getAllUsersService = async () => {
    try {
        const { users, lastUser } = await getAllUsersDB();
        return {
            success: true,
            message: 'Usuarios obtenidos con exito',
            data: users,
            lastUser: lastUser,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al obtener los Usuarios',
            error: error.message,
        };
    }
};