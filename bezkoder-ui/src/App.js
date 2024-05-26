import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/user-profile" component={UserProfile} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
