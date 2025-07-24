import { Component } from 'react';
import api from '../services/api';

class OnePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${this.props.postId}`);
      console.log('Response: ', res.data);
      this.setState({ comments: res.data || [] });
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  deletePost = async () => {
    try {
      const res = await api.delete(`/objave/delete/${this.props.postId}`);
      if (res.data.status.success) {
        alert('Post deleted');
      } else {
        alert('Post not deleted');
      }
    } catch (err) {
      console.error('Delete error: ', err);
      alert('Error while deleting');
    }
  };

  buildCommentTree = (comments) => {
    const commentMap = {};
    const rootComments = [];

    comments.forEach(comment => {
      comment.replies = [];
      commentMap[comment.id] = comment;
    });

    comments.forEach(comment => {
      if (comment.comment_id) {
        const parent = commentMap[comment.comment_id];
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  };

  renderComment = (comment, indent = 0) => {
    return (
      <div
        key={comment.id}
        style={{
          marginLeft: indent === 0 ? 0 : 36,
          borderLeft: indent === 0 ? 'none' : '2px solid #ccc',
          paddingLeft: indent === 0 ? 0 : 8,
          marginTop: 8
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`${process.env.REACT_APP_BACKEND}/pfps/${comment.pfp}`}
            alt="pfp"
            style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px' }}
          />
          <strong>{comment.username}</strong>:&nbsp;
          {comment.comment_id && comment.parentUsername
            ? `@${comment.parentUsername} `
            : ''}
          {comment.content}
        </div>

        {/* Render replies (always indented just once) */}
        {comment.replies?.map(reply =>
          this.renderComment({
            ...reply,
            parentUsername: comment.username // pass parent's username
          }, 1)
        )}
      </div>
    );
  };

  render() {
    const { username, imageUrl, description, profileImageUrl, currentUser } = this.props;
    const isAdmin = currentUser?.role_id === 1;
    const { comments } = this.state;

    const commentTree = this.buildCommentTree(comments);

    return (
      <div className="onePost">
        {/* Post Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img
            src={profileImageUrl}
            alt="Profile"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '10px'
            }}
          />
          <h2 style={{ margin: 0 }}>{username}</h2>
          {isAdmin && (
            <button
              style={{
                marginLeft: 'auto',
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
              onClick={this.deletePost}
            >
              Delete
            </button>
          )}
        </div>

        {/* Post Image and Description */}
        <img className="pic" src={imageUrl} alt="Post" />
        <p>{description}</p>

        {/* Comments Section */}
        <div className="comments-section" style={{ marginTop: '16px' }}>
          <h4>Comments</h4>
          {commentTree.length > 0 ? (
            commentTree.map(comment => this.renderComment(comment))
          ) : (
            <p style={{ fontStyle: 'italic', color: '#777' }}>No comments yet.</p>
          )}
        </div>
      </div>
    );
  }
}

export default OnePost;
