import React, { useRef, useState } from 'react';
import { Image, Button, Header} from 'semantic-ui-react'


function UploadImage({getSelectedFile}) {
  const inputRef = useRef();

  const [image, setImage] = useState(
    'https://react.semantic-ui.com/images/wireframe/image.png'
  );

  function handleInputChange(e){
    const fileToUpload = e.target.files[0];
    if(!fileToUpload) return;
    const fileSampleUrl = URL.createObjectURL(fileToUpload);
    setImage(fileSampleUrl);
    getSelectedFile(fileToUpload)
  }

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
  