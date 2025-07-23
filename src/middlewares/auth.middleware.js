import jwt from 'jsonwebtoken';
import configEnv from '../config/env.config.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Acceso no autorizado',
        });
    }
    try {
        const decoded = jwt.verify(token, configEnv.jwtoken);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Token expirado, invalido o ausente',
        });
    }
};

export const authRole = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Prohibido el Acceso',
            });
        }
        next();
    };
};
