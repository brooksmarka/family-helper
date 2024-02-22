import "./App.css";
import { useEffect, useReducer } from "react";

import awsConfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import { generateClient } from "aws-amplify/api";
import { listLists } from "./graphql/queries";
import { createList, deleteList } from "./graphql/mutations";
import { onCreateList, onDeleteList } from "./graphql/subscriptions";

import MainHeader from "./components/headers/MainHeader";
import Lists from "./components/Lists/Lists";

import { Container, Button, Icon, Modal, Form } from "semantic-ui-react";
import "@aws-amplify/ui-react/styles.css";
import "semantic-ui-css/semantic.min.css";

Amplify.configure(awsConfig);

const initialState = {
  title: "",
  description: "",
  lists: [],
  isModalOpen: false,
};

function listReducer(state = initialState, action) {
  switch (action.type) {
    case "DESCRIPTION_CHANGED":
      return { ...state, description: action.value };
    case "TITLE_CHANGED":
      return { ...state, title: action.value };
    case "UPDATE_LISTS":
      return { ...state, lists: [...action.value, ...state.lists] };
    case "DELETE_LIST":
      deleteListById(action.value);
      return {
        ...state,
      };
    case "DELETE_LIST_RESULT":
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.value),
      };
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, title: "", description: "" };
    default:
      console.log("Default action for: ", action);
      return state;
  }
}

const client = generateClient();

async function deleteListById(id) {
  const result = await client.graphql({
    query: deleteList,
    variables: { input: { id } },
  });
}

export default function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);

  async function fetchList() {
    try {
      const { data } = await client.graphql({ query: listLists });
      console.log({ data });
      dispatch({ type: "UPDATE_LISTS", value: data.listLists.items });
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    let createListSub = client.graphql({ query: onCreateList }).subscribe({
      next: ({ data }) => {
        dispatch({ type: "UPDATE_LISTS", value: [data.onCreateList] });
      },
      error: (error) => console.log(error),
    });
    let deleteListSub = client.graphql({ query: onDeleteList }).subscribe({
      next: ({ data }) => {
        dispatch({ type: "DELETE_LIST_RESULT", value: data.onDeleteList.id });
      },
      error: (error) => console.log(error),
    });

    return () => {
      deleteListSub.unsubscribe();
      createListSub.unsubscribe();
    };
  }, []);

  async function saveList() {
    try {
      const { title, description } = state;
      const result = await client.graphql({
        query: createList,
        variables: { input: { title, description } },
      });
      dispatch({ type: "CLOSE_MODAL" });
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
              onClick={() => dispatch({ type: "OPEN_MODAL" })}
            >
              <Icon name='plus' className='floatingButton_icon' />
            </Button>
            <div className='App'>
              <button onClick={signOut} className='signOutButton'>
                Sign out
              </button>
              <MainHeader />
              <Lists lists={state.lists} dispatch={dispatch} />
            </div>
          </Container>
          <Modal open={state.isModalOpen} dimmer='inverted'>
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
              <Button
                negative
                onClick={() => dispatch({ type: "CLOSE_MODAL" })}
              >
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
