import "./App.css";
import { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import awsConfig from "./aws-exports";
import { Amplify, } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import { generateClient } from "aws-amplify/api";
import { listLists } from "./graphql/queries";
import { deleteList } from "./graphql/mutations";
import { onCreateList, onDeleteList, onUpdateList } from "./graphql/subscriptions";

import MainHeader from "./components/headers/MainHeader";
import Lists from "./components/Lists/Lists";
import ListModal from "./components/modals/ListModal";

import { Container, Button, Icon } from "semantic-ui-react";
import "@aws-amplify/ui-react/styles.css";
import "semantic-ui-css/semantic.min.css";
import ListContainer from "./ListContainer";

Amplify.configure(awsConfig);

const initialState = {
  id: "",
  title: "",
  description: "",
  lists: [],
  isModalOpen: false,
  modalType: "",
};

function listReducer(state = initialState, action) {
  let newList;
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
    newList = state.lists.filter((list) => list.id !== action.value)  
    return {
        ...state,
        lists: newList,
      };
    case "UPDATE_LIST_RESULT":
      const index = state.lists.findIndex(
        item => item.id === action.value.id
      );
      newList = [...state.lists];
      delete action.value.listItems;
      newList[index] = action.value;
      return {...state, lists: newList };
    case "EDIT_LIST":
      console.log("here is action", action);
      const newValue = { ...action.value };
      delete newValue.children;
      delete newValue.dispatch;
      delete newValue.listItems;
      return {
        ...state,
        isModalOpen: true,
        modalType: "edit",
        id: newValue.id,
        description: newValue.description,
        title: newValue.title,
      };
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true, modalType: "add" };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, title: "", description: "", id: "" };
    default:
      console.log("Default action for: ", action);
      return state;
  }
}

const client = generateClient();

async function deleteListById(id) {
  await client.graphql({
    query: deleteList,
    variables: { input: { id } },
  });
}

export default function Main() {
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
    const createListSub = client.graphql({ query: onCreateList }).subscribe({
      next: ({ data }) => {
        console.log("onCreateList called", data);
        dispatch({ type: "UPDATE_LISTS", value: [data.onCreateList] });
      },
      error: (error) => console.log(error),
    });
    const updateListSub = client.graphql({ query: onUpdateList }).subscribe({
      next: ({data}) => {
        console.log("onUpdateeList called", data);
        dispatch({ type: "UPDATE_LIST_RESULT",
        value: data.onUpdateList });
      }
    })
    const deleteListSub = client.graphql({ query: onDeleteList }).subscribe({
      next: ({ data }) => {
        dispatch({ type: "DELETE_LIST_RESULT", value: data.onDeleteList.id });
      },
      error: (error) => console.log(error),
    });

    return () => {
      deleteListSub.unsubscribe();
      createListSub.unsubscribe();
      updateListSub.unsubscribe();
    };
  }, []);

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
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Lists lists={state.lists} dispatch={dispatch} />} />
                  <Route 
                    path='/list/:slug' 
                    element={<ListContainer lists={state.lists} />}
                  /> 
                </Routes>
              </BrowserRouter>
            </div>
          </Container>
          <ListModal
            state={state}
            dispatch={dispatch}
          />
        </div>
      )}
    </Authenticator>
  );
}
