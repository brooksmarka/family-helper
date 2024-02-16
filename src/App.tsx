import "./App.css";
import React from 'react';
import { useEffect, useState, useReducer } from "react";

import awsConfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { Authenticator } from "@aws-amplify/ui-react";

import { listLists } from "./graphql/queries";
import { createList } from "./graphql/mutations";
import { onCreateList } from "./graphql/subscriptions";

import MainHeader from "./components/headers/MainHeader";
import Lists from "./components/Lists/Lists";

import { Container, Button, Icon, Modal, Form } from "semantic-ui-react";
import "@aws-amplify/ui-react/styles.css";
import "semantic-ui-css/semantic.min.css";

import {State, Action, ListResponse } from './types';

Amplify.configure(awsConfig);

const initialState: State = {
  title: "",
  description: "",
};

function listReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "DESCRIPTION_CHANGED":
      return { ...state, description: action.value };
    case "TITLE_CHANGED":
      return { ...state, title: action.value };
    default:
      console.log("Default action for: ", action);
      return state;
  }
}

const client = generateClient();

function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [newList, setNewList] = useState("");
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchList() {
    try {
      const response = await client.graphql<ListResponse>({ query: listLists }) as { data: ListResponse};
      const { data } = response;
      if (data?.listLists?.items){
        setLists(data.listLists.items);
        console.log("data", data);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  }

  useEffect(() => {
    console.log("happening twice?");
    fetchList();
  }, []);

  useEffect(() => {
    if (newList !== "") {
      setLists([newList, ...lists]);
    }
  }, [newList]);

  function addToList(data) {
    console.log("data here maybe not though!!!", data);
    setNewList(data.onCreateList);
  }

  useEffect(() => {
    let subscription = client.graphql({ query: onCreateList }).subscribe({
      next: ({ data }) => addToList(data),
      error: (error) => console.warn(error),
    });
  }, []);

  function toggleModal(shouldOpen) {
    setIsModalOpen(shouldOpen);
  }

  async function saveList() {
    try {
      const { title, description } = state;
      const result = await client.graphql({
        query: createList,
        variables: { input: { title, description } },
      });
      toggleModal(false);
      console.log("result", result);
    } catch (e) {
      console.log("here is the error", e);
    }
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <Container>
            <Button
              className='floatingButton'
              onClick={() => toggleModal(true)}
            >
              <Icon name='plus' className='floatingButton_icon' />
            </Button>
            <div className='App'>
              <button onClick={signOut} className='signOutButton'>
                Sign out
              </button>
              <MainHeader />
              <Lists lists={lists} />
            </div>
          </Container>
          <Modal open={isModalOpen} dimmer='inverted'>
            <Modal.Header>Create Your List</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Input
                  error={
                    true ? false : { content: "Please add a name to your list" }
                  }
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
              <Button negative onClick={() => toggleModal(false)}>
                Cancel
              </Button>
              <Button positive onClick={() => saveList()}>
                Save
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
