import {connect} from '@/dbconfig/dbconfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';



connect();

export async function POST(request) {
    try {
        const reqBody  =  await request.json();
        const {email  , password} = reqBody;
        console.log(reqBody);

        // check user 
        const user = await User.findOne({email})   // if user if not find
        if(!user) {
            return NextResponse.json({error : 'user doesn`t exist'} , {status : 400})
        }

        // check password
        const validPassword = await bcryptjs.compare(password , user.password);

        if(!validPassword) {
            return NextResponse.json({error : 'your password is not defind'} , {status : 400});
        }

        // create tokenData 
        const tokenData = {
            id  : user._id,
            email : user.email,
            password : user.password
        }
        

        // create token
        const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET , {expiresIn : "1d"}) ;

        const response = NextResponse.json({
            message : 'Login Successfully',
            success : true
        })

        response.cookies.set("token" , token ,{httpOnly : true}) // cookie



        return response; // dont forget


    } catch (error) {
        return NextResponse.json({error : error.message},{status : 500})
    }
}


