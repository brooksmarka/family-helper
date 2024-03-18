import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Header,Segment, List } from 'semantic-ui-react';
import { generateClient } from "aws-amplify/api";
import { searchListItems } from './graphql/customQueries';

const client = generateClient();

function ListItems(props) {
    const { slug } = useParams();
    const [items, setItems] = useState([]);

    async function fetchItems(){
       const { data } = await client.graphql({
            query: searchListItems,
            filter: {
                slug: {
                    eq: slug
                }
            }
        })
        if(data !== null){
            setItems(data.searchLists.items[0].listItems.items)
        }
    }

    useEffect(()=> {
        fetchItems()
    },[slug]);
  return (
   <>
    <Header as='h2' attached="top">
        {props.listData?.title}
    </Header>
    <Segment attached>
        <List>
        {items.map((item) => {
            return(
          <List.Item>
            <List.Header>{item.title}</List.Header>
          </List.Item>
            );
        })}
        </List>
    </Segment>
   </>
  );
}

export default ListItems;