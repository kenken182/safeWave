import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  LoginPage, SignUpPage, HomePage, MeetingCreator
} from './routes';
import background from './assets/background.jpg';
import firebase from 'firebase'
import firebaseConfig from './firebaseconfig.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig)

export default function App() {
  const commonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    minHeight: '600px',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  };
  var user = firebase.auth().currentUser;
  if (user) {
    return (
      <Redirect to='/home'/>
    )
  }
  return (
    <div style={commonStyle}>
      <BrowserRouter>
      <Switch>
        <Route path="/signup">
            <SignUpPage />
          </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/createMeeting">
          <MeetingCreator />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}