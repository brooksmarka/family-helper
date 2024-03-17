import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Header,Segment, List } from 'semantic-ui-react';
import { generateClient } from "aws-amplify/api";
import { searchListItems } from './graphql/customQueries';

const client = generateClient();

function ListItems(props) {
    const { slug } = useParams();
    console.log("slug", slug)
    console.log("props", props)
    console.log("title", props.listData?.title)

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
        console.log("data from listActions", data)
        if(data !== null){
            console.log("here is value adding to array", data.searchLists.items[0].listItems.items )
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