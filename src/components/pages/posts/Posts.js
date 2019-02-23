import React, { Component } from "react";
import { getPosts } from "../../../actions/postsActions";
import { connect } from "react-redux";
import dateformat from "dateformat";
import { Link } from "react-router-dom";

class Posts extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  };

  render() {
    const posts = this.props.posts.posts.map(post => (
      <div className="col bg-white rounded">
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
    ));

    return (
      <div>
        <div className="jumbotron mt-4 bg-danger">
          <div className="text-center">
            <h1 className="text-white">Posts</h1>
            <div className="d-flex justify-content-end mb-3">
              <Link to="/posts/myposts" className="btn btn-primary">
                My Posts
              </Link>
            </div>
          </div>
          <div className="middle">{posts}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
