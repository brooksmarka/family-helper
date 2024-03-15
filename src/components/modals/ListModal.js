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

  async function saveList() {
    const imageKey = await uploadToS3(fileToUpload);
    console.log("imageKey", imageKey)
    try {
      const { title, description } = state;
      await client.graphql({
        query: createList,
        variables: { input: { title, description, imageKey } },
      });
      dispatch({ type: "CLOSE_MODAL" });
    } catch (e) {
      console.log("here is the error", e);
    }
  }

  async function changeList() {
    
    const imageKey = await uploadToS3(fileToUpload);
    console.log("imageKey", imageKey)
    try {
      const { id, title, description } = state;
      const result = await client.graphql({
        query: updateList,
        variables: { input: {id, title, description } },
      });
      dispatch({ type: "CLOSE_MODAL" });
      console.log("Edit data with result", result)
    } catch (e) {
      console.log("here is the error", e);
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
