import {Document, Schema, model } from "mongoose";

interface iUser{
    userName: string
    email:string
    password:string
    identification: number
    address: string
    verificationToken: string
    verified: boolean
    avatar: string 
};

interface iUserData extends iUser, Document{};

const logisticModel = new Schema<iUserData>(
    {
       userName:{
        type: String
       },
       email:{
        type: String,
        unique: true
       },
       password:{
        type: String
       },
       identification:{
        type: Number,
        unique: true
       },
       address:{
        type: String
       },
       verificationToken:{
        type: String,
        unique: true
       },
       verified:{
        type: Boolean,
        default: false
       },
       avatar:{
        type: String
       },
    },
    {timestamps: true}
);

export default model<iUserData>("Logistic", logisticModel);