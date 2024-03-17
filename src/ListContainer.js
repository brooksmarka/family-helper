import React from "react";
import ListItems from "./ListItems";
import { useParams } from "react-router-dom";

function ListContainer(props) {
    const { slug } = useParams();
    const filteredList = props.lists.find(i => i.slug === slug);
    return <ListItems listData={filteredList} />;
}

export default ListContainer;