import { loginUserService } from '../services/auth.service';

export const login = async (req, res) => {
    const { password, email } = req.body;
    const login = await loginUserService(email, password);
    if (!login) {
        return res.status(404).json({
            success: false,
            message: login.message,
            error: login.error,
            status: 404,
        });
    }
    res.status(200).json({
        success: true,
        data: { user: login.user, token: login.token },
    });
};
