import fs from 'fs'
import * as path from "path";
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

export function getDestinationPaths(filePath:string,hash:string){
    const filePathArr =  filePath.split('/')
    const hashIdx = filePathArr.indexOf(hash);
    const basePath =  filePathArr.slice(hashIdx).join('/');
    return `${process.env.OUTPUT_DIR}/${basePath}`;
}