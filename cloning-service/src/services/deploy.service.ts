import generateRandomId from "../utils/generateRandomId";
import simpleGit from "simple-git";
import {getAllFilePaths, getDestinationPaths} from "../utils/getAllFilePaths";
import * as path from "path";
import {uplodFileToR2} from "../utils/file";
import SQS from '../utils/rabbitmq';
import {updateStatus} from "../model/Status";
export interface deployRequestBody{
    repoUrl:string
}

export async function deployService(reqBody:deployRequestBody){
    const {repoUrl} = reqBody;
    const randomId = generateRandomId(repoUrl);
    const completePathArray =__dirname.split('/');
    completePathArray.splice(completePathArray.length -2 , 2)
    const outDir = `${process.env.OUTPUT_DIR}/${randomId}`;
    const completePath = path.join(completePathArray.join('/'),outDir);

     await simpleGit().clone(repoUrl,completePath);
     await updateStatus('clone',randomId);
    const queue = await SQS.getInstance();
    const filePaths = getAllFilePaths(completePath);
    // upload the files to Object Store
    for (const file of filePaths) {
        const destinationPath = getDestinationPaths(file,randomId);
        await uplodFileToR2(destinationPath,file);
    }
     updateStatus('upload',randomId);
     queue.sendMessage(randomId);
    return randomId;
}