import React, { useRef, useState, useEffect} from 'react';
import { Image, Button, Header} from 'semantic-ui-react'
import { uploadData } from  '@aws-amplify/storage';

function UploadImage() {
    const inputRef = useRef();

  const [image, setImage] = useState(
    'https://react.semantic-ui.com/images/wireframe/image.png'
  );
  const [fileName, setFileName] = useState();

  function handleInputChange(e){
    const fileToUpload = e.target.files[0];
    if(!fileToUpload) return;
    const fileSampleUrl = URL.createObjectURL(fileToUpload);
    setImage(fileSampleUrl);
    setFileName(fileToUpload);
  };
    useEffect(() => {
      const uploadImage = async () => {
        if(!fileName) return
        const [file, extension] = fileName.name.split(".");
        const mimeType = fileName.type;
        const key = `images/lists/${file}.${extension}`;
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
      }
    uploadImage();
  }, [fileName]);
  return (
    <>
        <Header as="h4">Upload your Image</Header>
        <Image size='large' src = {image} />
        <input
            ref={inputRef} 
            type='file' 
            onChange={handleInputChange} 
            className='hide'
        />
        <Button 
            className='mt-1' 
            onClick={()=> inputRef.current.click()}>
            Upload Image
        </Button>
    </>
  );
}

export default UploadImage;
  