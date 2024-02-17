import express from 'express';
require('dotenv').config()
import cors from 'cors'
import deployRouter from './routes/deploy.routes';
import database from "./model/Status";
import checkStatusRouter from "./routes/checkstatus.route";
const app = express();
app.use(express.json())

app.use(cors());
app.use('/deploy',deployRouter);
app.use('/status',checkStatusRouter);
try{
    database?.sync()
}catch (err){
    console.log('Error Connecting with DB',err);
}
app.listen(process.env.PORT,()=>console.log(`Server Started at port ${process.env.PORT}`))