import {getFiles, uploadBuild} from "./aws";
import {buildProject} from "./buildProject";
import deploy from "./deploy";
import {updateStatus} from "./Database";

export async function processMessage(hash:string){
     await getFiles(hash);
     await updateStatus(hash,'build');
     buildProject(hash).then(async ()=>{
            uploadBuild(hash).then(async () => {
                const port = deploy(hash);
                if (port) await updateStatus(hash, 'deploy', port)
            });
          }).then(()=>{
          console.log('Upload Successful');
     }).catch(()=>{
               console.log('Error')
          });

}