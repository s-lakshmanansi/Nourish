import React from 'react';
import './App.css';
import Dashboard from './Dashboard.js';
import ImageUpload from './ImageUpload.js'
import Profile from './Profile.js'
import Login from './Login.js'
import Register from "./Register.js"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    HOME_ROUTE,
    IMAGE_ROUTE,
    PROFILE_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    DEFAULT
} from './routes'

function App() {
    return (
        <div className="App">
            <div className="Background">
              <Router>
                  <Switch>
                      <Route exact path={HOME_ROUTE} render={(props) => <Dashboard {...props}/>} />
                      <Route exact path={IMAGE_ROUTE} render={(props) => <ImageUpload {...props} />} />
                      <Route exact path={PROFILE_ROUTE} render={(props) => <Profile {...props} />} />
                      <Route exact path={DEFAULT} render={(props) => <Login {...props} />} />
                      <Route exact path={LOGIN_ROUTE} render={(props) => <Login {...props} />} />
                      <Route exact path={REGISTER_ROUTE} render={(props) => <Register {...props} />} />
                  </Switch>
                </Router>
            </div>
        </div>
  );
}

export default App;
