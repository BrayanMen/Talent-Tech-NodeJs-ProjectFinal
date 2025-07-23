import { loginUserService, registerUserService } from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await registerUserService(user);
        if (!newUser) {
            return res.status(400).json({
                success: false,
                message: newUser.message,
                error: newUser.error,
            });
        }
        res.status(201).json({
            success: true,
            message: newUser.message,
            data: newUser.userClean,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const login = await loginUserService(email, password);
        if (!login.success) {
            return res.status(401).json({
                success: false,
                message: login.message,
                error: login.error,
            });
        }
        res.status(200).json({
            success: true,
            data: login.userClean,
            token: login.token,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};
