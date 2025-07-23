import { getAllUsersService } from '../services/users.service.js';
import { count } from 'firebase/firestore';

export const getAllUsers = async (req,res) => {
    try {
        const users = await getAllUsersService();
        if (!users.success){
            return res.status(404).json({
                success:false,
                message: users.message,
                error:users.error,
                status:404,
            })
        }
        res.status(200).json({
            success:true,
            message: users.message,
            data:users.data,
            count: users.data.length,
            lastUser: users.lastUser
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al procesar los datos de la solicitud',
        });
    }
};
