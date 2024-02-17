const express = require('express');
require('dotenv').config()
const aws = require('aws-sdk');
const app = express()
const cliArgs  =  process.argv;
console.log(cliArgs)
const portIdx = cliArgs.indexOf('--port');
if(portIdx <= -1 ){
    console.log('No Port Provided');
    process.exit(0);
}
const applicationHashIdx = cliArgs.indexOf('--hash');
if(applicationHashIdx <= -1) {
    console.log('No Application Id Provided');
    process.exit(0);
}
const applicationHash = cliArgs[applicationHashIdx+1];
const s3 = new aws.S3({
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
    endpoint:process.env.ENDPOINT,
})
app.get('/*',async (req,res) => {
    const filename = req.path === '/'?'index.html':req.path.slice(1);
    console.log('filename',`builds/${applicationHash}/${filename}`);
    // @ts-ignore
    const file = await s3.getObject({
        Bucket:process.env.BUCKET || 'vercel',
        Key:`builds/${applicationHash}/${filename}`
    }).promise();
    let contentType;
    if (filename.endsWith('.html')) {
        contentType = 'text/html';
    } else if (filename.endsWith('.js') || filename.endsWith('.js.map')) {
        contentType = 'application/javascript';
    } else if (filename.endsWith('.css')) {
        contentType = 'text/css';
    } else {
        // Default to plain text if the file type is not recognized
        contentType = 'text/plain';
    }

    console.log('Content-Type:', contentType);

    res.setHeader('Content-Type', contentType);
    res.send(file.Body);
})
const port = cliArgs[portIdx+1];

app.listen(port , () => console.log('Application started at '+ port));