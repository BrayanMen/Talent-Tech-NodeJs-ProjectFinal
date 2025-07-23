import {
    changePasswordService,
    deleteUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    updateWishlistService,
} from '../services/users.service.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        if (!users.success) {
            return res.status(404).json({
                success: false,
                message: users.message,
                error: users.error,
                status: 404,
            });
        }
        res.status(200).json({
            success: true,
            message: users.message,
            data: users.data,
            count: users.data.length,
            lastUser: users.lastUser,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};

export const getProfileUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await getUserByIdService(id);
        res.status(200).json({
            success: true,
            message: user.message,
            data: user.data,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const userData = req.body;
        const updatedUser = await updateUserService(id, userData);
        res.status(200).json({
            success: true,
            message: updatedUser.message,
            data: updatedUser.data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const deleted = await deleteUserService(id);
        res.status(200).json({
            success: true,
            message: deleted.message,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { id } = req.user;
        const { currentPassword, newPassword } = req.body;
        await changePasswordService(id, currentPassword, newPassword);
        res.status(200).json({
            success: true,
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateWishlist = async (req, res) => {
    try {
        const { id } = req.user;
        const { productId, action } = req.body;
        await updateWishlistService(id, productId, action);

        const user = await getUserByIdService(id);
        res.status(200).json({
            success: true,
            message: user.message,
            wishlist: user.data.wishlist || [],
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
