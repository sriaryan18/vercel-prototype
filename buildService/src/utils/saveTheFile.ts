import {S3} from "aws-sdk";
import * as fs from "fs";
import * as path from "path";

export default function saveTheFiles(filePath: S3.ObjectKey | undefined){
    if(!filePath) return;
    const splitedBaseName = __dirname.split('/')
    splitedBaseName.splice(splitedBaseName.length -2);
    const baseName = splitedBaseName.join('/');
    const filePathArr = filePath.split('/');
    const  fileDir = filePathArr.slice(0,filePathArr.length-1).join('/');
    const dirPath = path.join(baseName,fileDir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    const finalDestinationPath = `${baseName}/${filePath}`;
    return fs.createWriteStream(finalDestinationPath)
}