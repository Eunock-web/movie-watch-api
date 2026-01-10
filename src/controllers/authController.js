import { prisma } from '../config/db.js'
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

const register = async (req, res)=>{
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                error: "Name, email and password are required"
            });
        }

        //Check if user already exist
        const userExist = await prisma.user.findUnique({
            where: {email: email}
        });

        if(!userExist){
            return res.status(400).json({
                error : "User with this email already exist"
            });
        }

        //Hash of password
        const salt = await bcrypt.genSalt(10);
        const HashPassword  = await bcrypt.hash(password, salt);

        //Create user
        const user = await prisma.user.create({
            data : {
                name,
                email,
                password : HashPassword
            }
        });

        return res.status(201).json({
            data : {
                user : {
                    id : user.id,
                    name : user.name,
                    email : user.email,
                }
            }
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

const login = async (req, res)=>{
    try{
        const {email, password} = req.body;

        //Check if user already exist
        const user = await prisma.user.findUnique({
            where: {email: email}
        });

        if(!user){
            return res.status(400).json({
                error : "Invalide password or email"
            });
        }

        //Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                error : "Invalide password or email"
            });
        }

        //Generate token
        const token = generateToken(user.id, res );


            return res.status(201).json({
            data : {
                user : {
                    id : user.id,
                    name : user.name,
                    email : user.email,
                }
            },
            token
        });

    }catch(error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

const logout = async (req, res)=>{
    try{
        res.cookie("jwt", "", {
            httpOnly : true,
            expires : new Date(0)
        });

        return res.status(200).json({
            message : "Logout successfully"
        })
    }catch(error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

export {register, login, logout}