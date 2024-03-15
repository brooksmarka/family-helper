import React, {useState, useEffect } from "react";
import { Dimmer, Icon, Image, Item, Loader } from "semantic-ui-react";
import { getUrl } from  '@aws-amplify/storage';
import { Link } from "react-router-dom";

function List(props) {

  const { id, title, description, imageKey, createdAt, dispatch, slug } = props;
  const [imageUrl, setimageUrl] = useState('https://react.semantic-ui.com/images/wireframe/image.png');
  const [isLoading, setisLoading] = useState(true);

  async function fetchImageUrl(){
    const getUrlResult = await getUrl({
      key: imageKey,
      options: {
        accessLevel: 'guest' , // can be 'private', 'protected', or 'guest' but defaults to `guest`
        validateObjectExistence: false,  // defaults to false
        expiresIn: 20 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
      },
    });
    setimageUrl(getUrlResult.url)
    setisLoading(false);
  }
    
  useEffect(() => {
    if(imageKey){
      fetchImageUrl();
    } else {
      setisLoading(false);
    }
  },[])
  const content = <Loader />
  return (
    <Item>
      <Dimmer.Dimmable
        dimmed={isLoading}
        dimmer={{ active: isLoading, content}}
        as={Image}
        size='tiny'
        src={imageUrl}></Dimmer.Dimmable>
      <Item.Content>
        <Item.Header as={Link} to={`/list/${slug}`}>{title}</Item.Header>
        <Item.Description>{description}</Item.Description>
        <Item.Extra>
          {new Date(createdAt).toDateString()}
          <Icon
            name='edit'
            className='ml-3'
            onClick={() => dispatch({ type: "EDIT_LIST", value: props })}
          />
          <Icon
            name='trash'
            onClick={() => dispatch({ type: "DELETE_LIST", value: id })}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default List;
