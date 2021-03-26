import { Button, Container } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { firebaseConfig } from './firebase.config';
import SignUp from './SignUp';
const Login = () => {
    const [loggedUser,setLoggedUser]=useContext(UserContext)
    const history= useHistory()
    const location=useLocation()
    const {from} = location.state || {from:{pathname:'/'}}

    const handleGoogle=()=> {
        firebase.initializeApp(firebaseConfig);
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
 
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    const {displayName,email} = result.user;
    const signedUser={name:displayName,email}
    setLoggedUser(signedUser)
    history.replace(from)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode,errorMessage);
    
  });
    }
    return (
        <div>
            <Container component="main" maxWidth="xs">
            <SignUp/>
            <Button onClick={handleGoogle} color="primary" variant="contained" fullWidth>SignIn with Google</Button>
            </Container>
            
        </div>
    );
};

export default Login;