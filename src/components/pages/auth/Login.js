import React, { Component } from "react";
import flash from "../../layouts/helpers/flash";
import { connect } from "react-redux";
import { login } from "../../../actions/authActions";
import isEmpty from "../../layouts/helpers/is-empty";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",

      errors: {}
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const userData = {
      email,
      password
    };
    this.props.login(userData);
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="row">
        <div className="col-md-6">
          {isEmpty(errors) ? null : flash(errors, "alert alert-secondary")}
          <form>
            <div className="form-group">
              <label htmlFor="email" className="text-white">
                Email :
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="text-white">
                Password :
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChange}
              />
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <button
            onClick={this.props.loginForm}
            className="btn btn-warning homeBtn"
          >
            <strong>Cancel</strong>
          </button>
          <button
            onClick={this.onLoginSubmit}
            className="btn btn-success homeBtn"
          >
            <strong>Login</strong>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
