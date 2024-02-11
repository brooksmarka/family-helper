import './App.css'
import { Amplify } from 'aws-amplify'
import awsConfig from './aws-exports'
import { Authenticator, signOut } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(awsConfig)

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  )
}



