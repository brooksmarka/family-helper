import React from "react";
import List from "./List";
import { Item } from "semantic-ui-react";

function Lists({ lists, dispatch }) {
  const idSet = new Set(lists.map((item) => item.id));
  if (idSet.size !== lists.length) {
    console.error("Duplicate IDs detected in lists.");
  }
  return (
    <div>
      <Item.Group>
        {lists.map((item) => (
          <List key={item.id} {...item} dispatch={dispatch}>
            {item.title}
          </List>
        ))}
      </Item.Group>
    </div>
  );
}

export default Lists;
