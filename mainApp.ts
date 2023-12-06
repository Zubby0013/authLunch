import { Request, Response } from "express";

export const mainApp = async(app:any)=>{
    try {
        app.use("/api/v1/logistic")

        app.get("/",(req:Request, res:Response)=>{
            try {
                return res.status(200).json({
                    message: "welcome to my Logistic app"
                }) 
            } catch (error) {
                return res.status(404).json({
                    message: "default logistic error"
                }) 
            }
        })
    } catch (error) {
        console.log(error)
    }
}