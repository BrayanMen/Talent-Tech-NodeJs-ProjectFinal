import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import configEnv from '../config/env.config';
import { createUserDB, getUserByEmailDB } from '../models/users.model';

const JWT_SECRET = configEnv.jwtoken;
const SALT = 12;

export const registerUserService = async userData => {
    try {
        const userExist = await getUserByEmailDB(userData.email);
        if (userExist) throw new Error('El correo ya esta registrado.');

        const hashedPassword = await bcrypt.hash(userData.password, SALT);

        const newUser = await createUserDB({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.role || 'user',
            avatar:
                userData.avatar ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiG_u1Sz0xjaaAWESNQcHfzLLn3zKX2kuClA&s',
            address: userData.address || {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            },
            wishlist: [],
        });
        const { password: _, ...userClean } = newUser;
        return {
            success: true,
            token,
            message: 'Usuario registrado con Exitoso',
            user: { userClean },
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al Registrar el Usuario',
            error: error.message,
        };
    }
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
