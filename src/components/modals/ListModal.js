import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

function ListModal({ state, dispatch, saveList, editList }) {
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
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
          Cancel
        </Button>
        <Button
          positive
          onClick={() => {
            state.modalType === "add" ? saveList() : saveList();
          }}
        >
          {state.modalType === "add" ? "Save" : "Update"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ListModal;
