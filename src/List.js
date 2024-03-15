import React from 'react'
import { useParams } from 'react-router-dom';

function List(props) {
    const { slug } = useParams();
    console.log("slug", slug)
  return (
    <div>
      This is our list page for {slug}
    </div>
  );
}

export default List;