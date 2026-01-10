import { prisma } from '../config/db.js'
import bcrypt from 'bcryptjs';

const regsiterController = async (req, res)=>{
    const {name, email, password} = req.body;

    //Check if user already exist
    const userExist = await prisma.user.findUnique({
        where: {email: email}
    })

    if(userExist){
        return res.status(400).json({
            error : "User with this email already exist"
        })
    }

    //Hash of password
    const salt = await bcrypt.genSalt(10);
    const HashPassword  = await bcrypt.hash(password, salt);

    //Create user
    const user = prisma.user.create({
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
                name : name,
                email : email,
            }
        }
    });
}


export {regsiterController}