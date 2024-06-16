import multiparty from 'multiparty';
import {S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import { isAdminRequest } from './auth/[...nextauth]';
const bucketName = 'cinevault';

export default async function handle(req, res){
    await isAdminRequest(req, res);
    const form = new multiparty.Form();
    const {fields,files} = await new Promise((resolve,reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({fields,files});
        });
    });
    
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    });
    const links = [];
    for (const file of files.file){
        const ext = file.originalFilename.split('.').pop();

        const newFilename = Date.now() + '.' + ext;
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link)
    }
    
    return res.json({links})
}

//makes the function not parse the request so 
//we can do it manually
export const config = {
    api: {bodyParser: false},
};