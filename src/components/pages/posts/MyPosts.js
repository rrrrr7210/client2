import React, { Component } from "react";
import { myPosts, createPost, deletePost } from "../../../actions/postsActions";
import { connect } from "react-redux";
import dateformat from "dateformat";
import { Link } from "react-router-dom";
import isEmpty from "../../layouts/helpers/is-empty";
import flash from "../../layouts/helpers/flash";

class MyPosts extends Component {
  constructor() {
    super();
    this.state = {
      createForm: false,
      title: "",
      body: "",
      errors: {},
      message: []
    };
  }
  componentDidMount = () => {
    this.props.myPosts(this.props.auth.loggedUser.id);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.posts.message.message) {
      this.setState({ message: nextProps.posts.message.message });
    }
    if (nextProps.posts.message) {
      this.setState({ message: nextProps.posts.message });
    }
  };

  createFormClick = e => {
    e.preventDefault();
    this.setState({ createForm: !this.state.createForm });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCreatePostSubmit = e => {
    e.preventDefault();
    const { title, body } = this.state;
    const newPost = {
      title,
      body,
      userId: this.props.auth.loggedUser.id
    };
    this.props.createPost(newPost);
    this.setState({ title: "", body: "" });
  };

  onDeleteSubmit = id => e => {
    e.preventDefault();
    this.props.deletePost(id);
  };

  render() {
    let posts;
    const myposts = this.props.posts.myposts;
    if (myposts.length === 0) {
      posts = <h1 className="text-center">You don't have post yet</h1>;
    } else {
      // Have own posts
      posts = this.props.posts.myposts.map(post => (
        <div className="row m-3">
          <div className="col-md-10 bg-white rounded">
            <div className="row">
              <div className="col-md-8">
                <h3>{post.title}</h3>
              </div>
              <div className="col-md-4 text-right">
                {dateformat(post.date, "mmmm dS, yyyy, h:MM:ss")}
              </div>
            </div>

            <div className="col-md-10">
              <p className="postbody">{post.body}</p>
            </div>
          </div>
          <div className="col-md-2">
            {/* DELETE */}
            <button
              key={post._id}
              onClick={this.onDeleteSubmit(post._id)}
              className="btn btn-dark"
            >
              X
            </button>
          </div>
        </div>
      ));
    }

    let form;
    if (this.state.createForm) {
      // FORM
      form = (
        <div>
          <div className="form-group">
            <label htmlFor="title" className="text-white">
              Title :
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter Title"
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body" className="text-white">
              Body :
            </label>
            <input
              type="text"
              className="form-control"
              name="body"
              placeholder="Enter Body"
              onChange={this.onChange}
              value={this.state.body}
            />
          </div>
          <button
            onClick={this.onCreatePostSubmit}
            className="btn btn-success d-flex justify-content-end"
          >
            Add Post
          </button>
        </div>
      );
    } else {
    }

    // NAVIGATION BUTTONS

    let buttons;
    if (this.state.createForm) {
      buttons = (
        <div className="d-flex justify-content-end mb-3">
          <button onClick={this.createFormClick} className="btn btn-warning">
            Cancel
          </button>
        </div>
      );
    } else {
      buttons = (
        <div className="row">
          <div className="col-md-6 d-flex justify-content-start mb-2">
            <Link to="/posts" className="btn btn-info">
              Back
            </Link>
          </div>
          <div className="col-md-6 d-flex justify-content-end mb-2 ">
            <button onClick={this.createFormClick} className="btn btn-info">
              Add Post
            </button>
          </div>
        </div>
      );
    }
    const { errors, message } = this.state;
    return (
      <div>
        <div className="jumbotron mt-4 bg-danger">
          <div className="text-center">
            <h1 className="text-white">My Posts</h1>
            {buttons}
            {isEmpty(errors) ? null : flash(errors, "alert alert-secondary")}
            {isEmpty(message) ? null : flash(message, "alert alert-success")}
            {form}
          </div>
          <div className="">{posts}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { myPosts, createPost, deletePost }
)(MyPosts);
