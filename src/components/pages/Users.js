import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/usersActions";

class Users extends Component {
  componentDidMount = () => {
    this.props.getUsers();
  };

  render() {
    const { users, loading } = this.props.users;
    console.log(users);

    let userList;
    if (!loading) {
      userList = users.map(user => (
        <div className="col-md-4">
          <div className="card bg-light m-2">
            <div className="card-header">{user.name}</div>
            <div className="card-body">{user.email}</div>
          </div>
        </div>
      ));
    } else {
      userList = (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
    }
    return (
      <div>
        <div className="jumbotron mt-4 bg-danger">
          <div className="text-center">
            <h1 className="text-white">Users</h1>
          </div>
          <div className="row text-center">{userList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
