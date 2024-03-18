import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

import { generateClient } from "aws-amplify/api";
import { createList, updateList } from "../../graphql/mutations";
import UploadImage from "../HandleImages/UploadImage";
import { useS3 } from "../../hooks/useS3";

const client = generateClient();

function ListModal({ state, dispatch}) {
  const [uploadToS3] = useS3();
  const [fileToUpload, setfileToUpload] = useState();

  function generateSlug(title){
    return title.replace(/ /g, "_").toLowerCase();
  }

  async function saveList() {
    const imageKey = await uploadToS3(fileToUpload);
   
    try {
      const { title, description } = state;
      const slug = generateSlug(title);
    
      if (!title || !description || !imageKey) {
        console.error("Missing required fields", { title, description, imageKey, slug });
        return; 
      }
      await client.graphql({
        query: createList,
        variables: { input: { title, description, imageKey, slug } },
      });
      dispatch({ type: "CLOSE_MODAL" });
    } catch (e) {
      console.log("error in SaveList", e);
    }
  }

  async function changeList() {
    
    const imageKey = await uploadToS3(fileToUpload);
    try {
      const { id, title, description } = state;
      const result = await client.graphql({
        query: updateList,
        variables: { input: {id, title, description, imageKey} },
      });
      dispatch({ type: "CLOSE_MODAL" });
    } catch (e) {
      console.log("error in changeList", e);
    }
  }

  function getSelectedFile(fileName){
    setfileToUpload(fileName)
  }

  return (
    <Modal open={state.isModalOpen} dimmer='inverted'>
      <Modal.Header>
        {state.modalType === "add" ? "Create " : "Edit "}
        Your List
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            error={true ? false : { content: "Please add a name to your list" }}
            label='Title'
            placeholder='My amazing list'
            value={state.title}
            onChange={(e) =>
              dispatch({
                type: "TITLE_CHANGED",
                value: e.target.value,
              })
            }
          ></Form.Input>
          <Form.TextArea
            value={state.description}
            label='Description'
            placeholder='Things that my list is about'
            onChange={(e) =>
              dispatch({
                type: "DESCRIPTION_CHANGED",
                value: e.target.value,
              })
            }
          ></Form.TextArea>
          <UploadImage getSelectedFile={getSelectedFile}/>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
          Cancel
        </Button>
        <Button
          positive
          onClick={() => {
            state.modalType === "add" ? saveList() : changeList();
          }}
        >
          {state.modalType === "add" ? "Save" : "Update"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ListModal;
