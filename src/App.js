import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import jwt_decode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";
import Posts from "./components/pages/posts/Posts";
import MyPosts from "./components/pages/posts/MyPosts";

import setAuthToken from "./components/layouts/helpers/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/posts/myposts" component={MyPosts} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
