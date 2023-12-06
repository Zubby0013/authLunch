import mongoose,{connect} from "mongoose";

const URL:string = 'mongodb://127.0.0.1:27017/logistic';

export const dbConfig = async()=>{
    try {
        await mongoose.connect(URL).then((res:any)=>{
            try {
                console.log("let's go 🥪🚀...")
            } catch (error) {
                console.log(error)
            }
        })
    } catch (error) {
        console.log(error)
    }
}