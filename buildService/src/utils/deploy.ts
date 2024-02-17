import * as child_process from "child_process";

const availablePorts = [
    5000, 5001, 5002, 5003, 5004, 5005
];

export default function deploy(hash: string) {
    if (!availablePorts.length) {
        console.log('Cannot deploy as all the ports are busy');
        return;
    }
    const port = availablePorts.shift(); // Remove the first port from the array
    if (port === undefined) {
        console.log('Error: Failed to get a port from availablePorts');
        return;
    }
    console.log("PORT : ",port)
    // Execute deployment script with the selected port and hash
    const currentDirArray = __dirname.split('/');
    const baseDir = currentDirArray.slice(0,currentDirArray.length-2).join('/');
    console.log(baseDir);
    child_process.exec(`node  ${baseDir}/src/deployScript.js --port ${port} --hash ${hash}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Deployment error:', error);
            // Push back the port to availablePorts if deployment fails
            availablePorts.push(port);
        } else {
            console.log('Deployment successful:', stdout);
        }
    });
    return port;
}
