import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    let output;
    if (this.props.auth.isAuthenticated) {
      output = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/posts" className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link" onClick={this.onLogoutClick}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      output = (
        <ul className="navbar-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </ul>
      );
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          {output}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
