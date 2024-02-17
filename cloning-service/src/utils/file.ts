import {S3} from 'aws-sdk';
import fs from "fs";
require('dotenv').config()
const s3 = new S3({
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
    endpoint:process.env.ENDPOINT
});


export async function uplodFileToR2(fileName:string,localFilePath:string){
    const fileContent = fs.readFileSync(localFilePath);
    await s3.upload({
        Body:fileContent,
        Bucket:'vercel' ,
        Key:fileName

    }).promise();
}