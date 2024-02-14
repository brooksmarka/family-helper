import "./App.css";
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsConfig from "./aws-exports";
import { Authenticator, signOut } from "@aws-amplify/ui-react";
import { listLists } from "./graphql/queries";
import "semantic-ui-css/semantic.min.css";
import MainHeader from "./components/headers/MainHeader";
import Lists from "./components/Lists/Lists";
import "@aws-amplify/ui-react/styles.css";
import { Container, Button, Icon, Modal, Form } from "semantic-ui-react";

Amplify.configure(awsConfig);

const client = generateClient();

export default function App() {
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchList() {
    try {
      const { data } = await client.graphql({ query: listLists });
      setLists(data.listLists.items);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  function toggleModal(shouldOpen) {
    setIsModalOpen(shouldOpen);
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
                ></Form.Input>
                <Form.TextArea
                  label='Description'
                  placeholder='Things that my pretty list is about'
                ></Form.TextArea>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={() => toggleModal(false)}>
                Cancel
              </Button>
              <Button positive onClick={() => toggleModal(false)}>
                Save
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )}
    </Authenticator>
  );
}
