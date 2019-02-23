import React, { Component } from "react";
import { connect } from "react-redux";

import Register from "./auth/Register";
import Login from "./auth/Login";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      regForm: false,
      loginForm: false
    };
  }
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
  };

  onRegClick = e => {
    e.preventDefault();
    this.setState({ regForm: !this.state.regForm });
  };

  onLoginClick = e => {
    e.preventDefault();
    this.setState({ loginForm: !this.state.loginForm });
  };

  render() {
    const { regForm, loginForm } = this.state;
    let home;
    if (regForm && loginForm === false) {
      home = <Register regForm={this.onRegClick} />;
    } else if (loginForm && regForm === false) {
      home = <Login loginForm={this.onLoginClick} />;
    } else {
      home = (
        <div className="row">
          <div className="col-md-6">
            <button onClick={this.onRegClick} className="btn btn-info homeBtn">
              <strong>Register</strong>
            </button>
          </div>
          <div className="col-md-6">
            <button
              onClick={this.onLoginClick}
              className="btn btn-success homeBtn"
            >
              <strong>Log In</strong>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="box mt-4 bg-danger rounded">
          <div className="text-center pt-4">
            <h1 className="text-white">Welcome</h1>
          </div>
          <div className="text-center m-4 homeBox">{home}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
