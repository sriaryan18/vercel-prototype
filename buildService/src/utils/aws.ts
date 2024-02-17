import {S3} from 'aws-sdk';
import saveTheFiles from "./saveTheFile";
import * as path from "path";
import fs from "fs";
import deploy from "./deploy";
require('dotenv').config()
const s3 = new S3({
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
    endpoint:process.env.ENDPOINT,
});


export async function getFiles(folderName:string){

    const allFiles=await s3.listObjects({
        Bucket:process.env.BUCKET || '',
       Prefix:`${process.env.OUTPUT_DIR}/${folderName}`
    }).promise();
    const allPromises = allFiles.Contents?.map(fileName => {
        return new Promise(async (resolve) => {
            if(!fileName.Key){
                resolve("");
                return;
            }
            const writableStream = saveTheFiles(fileName.Key);
            if(!writableStream){
                console.log('Failed creating writable stream');
                resolve('');
                return;
            }
            s3.getObject(<S3.GetObjectRequest>{
                Bucket: process.env.BUCKET || '',
                Key: fileName?.Key
            }).createReadStream().pipe(writableStream).on('finish', ()=> resolve(""));

        })
    });
    // @ts-ignore
    await Promise.all(allPromises?.filter(x => x!== undefined));
    console.log('Completed Copying')
}

export async function uplodFileToR2(fileName:string,localFilePath:string){
    const fileContent = fs.readFileSync(localFilePath);
    await s3.upload({
        Body:fileContent,
        Bucket:'vercel' ,
        Key:fileName

    }).promise();
}
export function getAllFilePaths(folderPath:string){
    let response :string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach((file:any) => {
        const fullFilePath = path.join(folderPath,file);
        if(fs.statSync(fullFilePath).isDirectory()){
            response = response.concat(getAllFilePaths(fullFilePath))
        }else{
            response.push(fullFilePath);
        }

    });
    return response;
}
export async function uploadBuild(hash:string){
    return new Promise(async (resolve,reject) => {
        try{
            const destinationFolder = `builds/${hash}`
            const rootProjectDirArr = __dirname.split('/');
            const rootProjectDir = rootProjectDirArr.slice(0,rootProjectDirArr.length-2).join('/')
            const sourcePath = path.join(rootProjectDir,`${process.env.OUTPUT_DIR}/${hash}/build`);
            const allFiles = getAllFilePaths(sourcePath);
            for (const file of allFiles) {
                const filePathArr = file.split('/');
                const buildIdx = filePathArr.indexOf('build');
                const filePath = filePathArr.slice(buildIdx+1).join('/');
                const destinationPath=`${destinationFolder}/${filePath}`
                await uplodFileToR2(destinationPath,file);
            }
            resolve('SuccessFully Uploaded');
        }catch (err){
            console.log('Error at UploadBuild',err)
            reject('Failed Uploading');
        }
    })

}
