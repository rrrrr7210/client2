import React, { Component } from "react";
import flash from "../../layouts/helpers/flash";
import { connect } from "react-redux";
import { register } from "../../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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

  onRegSubmitClick = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.register(newUser, this.props.history);
  };

  render() {
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="email" className="text-white">
                Email : {flash(errors.email, "alert alert-secondary")}
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
              <label htmlFor="name" className="text-white">
                Name : {flash(errors.name, "alert alert-secondary")}
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-white">
                Password : {flash(errors.password, "alert alert-secondary")}
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
            <div className="form-group">
              <label htmlFor="password2" className="text-white">
                Confirm Password :{" "}
                {flash(errors.password2, "alert alert-secondary")}
              </label>
              <input
                type="password"
                className="form-control"
                name="password2"
                placeholder="Enter Password Again"
                value={password2}
                onChange={this.onChange}
              />
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <button
            onClick={this.props.regForm}
            className="btn btn-warning homeBtn"
          >
            <strong>Cancel</strong>
          </button>
          <button
            onClick={this.onRegSubmitClick}
            className="btn btn-info homeBtn"
          >
            <strong>Register</strong>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
