import cors from "cors";
import express,{Application} from "express";
import { dbConfig } from "./utils/dbConfig";

const port:number|string = process.env.PORT ||3102;

const app:Application = express();

app.use(express.json());
app.use(cors());

app.listen(port, ()=>{
    dbConfig()
})