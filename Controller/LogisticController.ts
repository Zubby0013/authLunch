import { Request,Response } from "express";
import logisticModel from "../model/logisticModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";



export const createUser = async(req:Request, res:Response)=>{
    try {
        const {userName, email, password, identification, address} = req.body;

        const generate = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, generate);

        const token = crypto.randomBytes(3).toString("hex");

        const user = await logisticModel.create({
            userName,
            email,
            password: hash,
            identification,
            address,
            verificationToken: token,
        });

        return res.status(201).json({
            message: "user successfully created",
            data: user
        })
    } catch (error:any) {
        return res.status(404).json({
            message: "error creating user",
            data: error.message
        })
    }
};

export const signinUser = async(req:Request, res:Response)=>{
    try {
        const { email, password} = req.body;

        const findUser:any = await logisticModel.findOne({email});

        if (email) {
            const checker = await bcrypt.compare(password, findUser?.password);

            if (checker) {
                if (findUser.verified && findUser.verificationToken === "") {
                    const webToken = jwt.sign({id: findUser._id},"justALock",{
                        expiresIn: "2mins",
                    });
                    
                    return res.status(201).json({
                        message: "user successfully signed in",
                        data: webToken
                    })
                } else {
                    return res.status(404).json({
                        message: "Unverified account",
                    })
                }
            } else {
                return res.status(404).json({
                    message: "something went up check password",
                })
            }
        } else {
            
            return res.status(404).json({
                message: "something went up check email",
            })
        }
    } catch (error:any) {
        return res.status(404).json({
            message: "error creating user",
            data: error.message
        })
    }
};

export const verifyUser = async(req:Request, res:Response)=>{
    try {
        const { email, token} = req.body;

        const checkUserEmail:any = await logisticModel.findOne({email});
        const checkUserToken:any = await logisticModel.findOne({verificationToken:token});

        if (checkUserEmail && checkUserToken) {
           const verifing =  await  logisticModel.findByIdAndUpdate(
            checkUserEmail._id,
            {
                verification: "",
                verified: true
            },
            {new: true}
            );
            return res.status(201).json({
                message: "user successfully created",
                data: verifing
        })
        } else {
            
            return res.status(404).json({
                message: "user account not verified",
            })
        }
    } catch (error:any) {
        return res.status(404).json({
            message: "error verifing user",
            data: error.message
        })
    }
};

