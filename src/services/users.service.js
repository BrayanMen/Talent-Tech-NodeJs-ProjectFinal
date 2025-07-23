import {
    deleteUserDB,
    getAllUsersDB,
    getUserByIdDB,
    updateUserDB,
    updateWishlistDB,
} from '../models/users.model.js';

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

export const getUserByIdService = async id => {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID requerido',
                message: 'Debe proporcionar un ID valido',
            };
        }
        const user = await getUserByIdDB(id);
        if (!user) {
            return {
                success: false,
                error: 'Usuario no encontrado',
                message: `No se encontro el usuario por el ID: ${id}`,
            };
        }
        return {
            success: true,
            message: 'Usuario obtenido con exito',
            data: user,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al obtener el Usuario',
            error: error.message,
        };
    }
};

export const updateUserService = async (id, userData) => {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID requerido',
                message: 'Debe proporcionar un ID valido',
            };
        }
        const updated = await updateUserDB(id, userData);
        return {
            success: true,
            message: 'Usuario modificado',
            data: updated,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al modificar el Usuario',
            error: error.message,
        };
    }
};

export const deleteUserService = async id => {
    try {
        if (!id) {
            return {
                success: false,
                error: 'ID requerido',
                message: 'Debe proporcionar un ID valido',
            };
        }
        const productDelete = await deleteUserDB(id);
        return {
            success: true,
            message: 'Usuario Eliminado',
            data: productDelete.message,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al eliminar el Usuario',
            error: error.message,
        };
    }
};

export const changePasswordService = async (userId, currentPassword, newPassword) => {
    const SALT = 12;
    try {
        const user = await getUserByIdDB(userId);
        if (!user) throw new Error('Usuario no existe');

        const passwordValid = await bcrypt.compare(currentPassword, user.password);
        if (!passwordValid) throw new Error('Contraseña actual incorrecta');

        const hash = await bcrypt.hash(newPassword, SALT);
        await updateUserDB(userId, { password: hash });
        return { message: 'Contraseña actualizada exitosamente' };
    } catch (error) {
        return {
            success: false,
            message: 'Error al cambiar la Contraseña',
            error: error.message,
        };
    }
};

export const updateWishlistService = async (userId, productId, action) => {
    try {
        const updatedWishlist = await updateWishlistDB(userId, productId, action);
        return {
            success: true,
            message: updatedWishlist.message,
            data: updatedWishlist.data,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al modificar favoritos',
            error: error.message,
        };
    }
};
