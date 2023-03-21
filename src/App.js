import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks'
import {useCollectionData} from 'react-firebase-hooks/firestore' 

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
})

const auth = firebase.auth()
const firestore = firebase.firestore()
const [user] = useAuthState(auth)

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  return <button onClick={signInWithGoogle}>Sign in with Google</button>
}

function SignOut() {
  return auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)
  const messages = useCollectionData(query, {idField: 'id'})
  return(
    <>
      <div>{messages && messages.map()}</div>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <header>
        
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
