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

    if(!firebase.apps.length){firebase.initializeApp(firebaseConfig)}
    const handleGoogle=()=> {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
    const { displayName, email } = result.user;
    const signedUser = { name: displayName, email };
    setLoggedUser(signedUser);
    storeAuthToken()
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode,errorMessage);
    
  });
    }
    const storeAuthToken=()=>{
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        
        // Send token to your backend via HTTPS
        sessionStorage.setItem('token',idToken);
        history.replace(from);
      }).catch(function(error) {
        // Handle error
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