import React, { useEffect, useState } from "react";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyBfINbTwSIPXD-eOUlBylZAc3FFo5913tM",
  authDomain: "crud-img-47ed4.firebaseapp.com",
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  //   callbacks: {
  //     signInSuccessWithAuthResult: () => false,
  //   },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default SignInScreen;
