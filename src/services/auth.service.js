import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import configEnv from '../config/env.config';
import { getUserByEmailDB } from '../models/users.model';

const JWT_SECRET = configEnv.jwtoken;
const SALT = 12;

export const registerUserService = async userData => {
    const userExist = await getUserByEmailDB(userData.email);
    if (userExist) throw new Error('El correo ya esta registrado.');
};

export const loginUserService = async (email, password) => {
    try {
        const user = await getUserByEmailDB(email);
        if (!user) throw new Error('El correo es incorrecto');

        const passwordValid = await bcrypt.compare(password, email.password);
        if (!passwordValid) throw new Error('Contraseña incorrecta');

        const token = jwt.sign(
            {
                id: user.uid,
                email: user.email,
                role: user.role,
                name: user.name,
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        const { password: _, ...userClean } = user;
        return {
            success: true,
            token,
            message: 'Inicio de Sesion Exitoso',
            user: { userClean },
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al Iniciar Sesion',
            error: error.message,
        };
    }
};
