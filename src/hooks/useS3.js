import {v4 as uuidv4} from 'uuid'
import { uploadData } from  '@aws-amplify/storage';

export function useS3() {
    async function saveToS3 (fileName) {
        if(!fileName) return
        const [file, extension] = fileName.name.split(".");
        const mimeType = fileName.type;
        const key = `images/lists/${file}_${uuidv4()}.${extension}`;
        try {
        const result = await uploadData({
            key,
            data: fileName,
            options: {
            accessLevel: 'guest',
            contentType: mimeType,
            metadata: {
                app: 'family helper'
            }
            }
        }).result; 
            console.log('Succeeded: ', result);
        } catch (error) {
            console.log('Error: ', error);
        }
        console.log("save to s3", key)
    return key;
    }
return [saveToS3]
}