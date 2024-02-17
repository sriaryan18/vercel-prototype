// @ts-ignore
import npm from 'npm-commands'
import * as Path from "path";
export function buildProject(folderPath:string){
    return new Promise((resolve, reject)=>{
        try{
            const dirArray = __dirname.split('/');
            const rootDirPath = dirArray.slice(0,dirArray.length-2).join('/') + `/${process.env.OUTPUT_DIR}`;
            const finalPath = Path.join(rootDirPath,folderPath);
            npm().cwd(finalPath).install();
            console.log('installed');
            npm().cwd(finalPath).run('build');
            resolve("");
            return;
        }catch (err){
            console.log(err);
            reject('Failed to Build')
        }
    })
}