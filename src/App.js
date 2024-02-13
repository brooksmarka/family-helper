import './App.css'
import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify'
import { generateClient } from "aws-amplify/api";
import awsConfig from './aws-exports'
import { Authenticator, signOut } from '@aws-amplify/ui-react'
import { listLists } from './graphql/queries'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(awsConfig)

const client = generateClient()

export default function App() {

  const [list, setList] = useState([]);

  

  async function fetchList() {
    try {
      const {data}= await client.graphql({ query: listLists });
      setList(data.listLists.items)
      console.log("data", data)
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  }

  useEffect (() => {
    fetchList();
  },[])

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className='App'>
          <main>
            <h1>Hello {user.username}</h1>
            <ul>
              {list.map(item => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
            <button onClick={signOut}>Sign out</button>
          </main>
        </div>
      )}
    </Authenticator>
  );
}



