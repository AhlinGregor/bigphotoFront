import { Component } from 'react';
import api from '../services/api';

class OnePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      liked: false,
      likeCount: 0,
    };
  }

  componentDidMount() {
    this.fetchComments();
    this.checkIfLiked();
    this.fetchLikeCount();
  }

  checkIfLiked = async () => {
    try {
      // onsole.log(`postid: ${this.props.postId} userid: ${this.props.currentUser.id}`)
      const res = await api.get(`/objave/isliked/${this.props.currentUser.id}/${this.props.postId}`);
      this.setState({ liked: res.data.liked });
    } catch (err) {
      console.error('Failed to check like status:', err);
    }
  };

  postComment = async () => {
    
  }

  fetchLikeCount = async () => {
    try {
      // console.log("Fetching like count for postId:", this.props.postId);
      const res = await api.get(`/objave/likecount/${this.props.postId}`);
      this.setState({ likeCount: res.data.count });
    } catch (err) {
      console.error('Failed to fetch like count:', err);
    }
  };

  handleLike = async () => {
    const { liked, likeCount } = this.state;
    const { postId, currentUser } = this.props;

    try {
      if (liked) {
        // Unlike
        await api.post(`/objave/unlike`, {
          postId,
          userId: currentUser.id,
        });
        this.setState({ liked: false, likeCount: likeCount - 1 });
      } else {
        // Like
        await api.post(`/objave/like`, {
          postId,
          userId: currentUser.id,
        });
        this.setState({ liked: true, likeCount: likeCount + 1 });
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };


  fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${this.props.postId}`);
      // console.log('Response: ', res.data);
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

  renderComment = (comment, isReply = false) => {
  return (
    <div
      key={comment.id}
      style={{
        marginLeft: isReply ? 36 : 0,
        borderLeft: isReply ? '2px solid #ccc' : 'none',
        paddingLeft: isReply ? 8 : 0,
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
        {comment.content}
        <button onClick={this.openCommentBox} style={{marginLeft: 'auto'}}>
          reply
        </button>
      </div>

      {/* All replies are rendered at same indent level */}
      {comment.replies?.map(reply =>
        this.renderComment(reply, true)
      )}
    </div>
  );
};


  render() {
    const { username, user_id, imageUrl, description, profileImageUrl, currentUser } = this.props;
    const isAdmin = currentUser?.role_id === 1;
    const isAuthor = currentUser?.id === this.props.userId;
    // console.log(`current user id: ${currentUser.id}, author user: ${this.props.userId} so the isAuthor is ${isAuthor}`);
    const { comments } = this.state;
    const isLiked = this.state.liked;

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
          {(isAdmin || isAuthor) && (
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
        {/* Like Button */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          <button
            onClick={this.handleLike}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '40px',
              color: this.state.liked ? 'red' : '#888'
            }}
            aria-label="Like"
          >
           ♥
          </button>
          <span style={{ marginLeft: '6px' }}>{this.state.likeCount || 0}</span>
        </div>

        <p>{description}</p>

        {/* Comments Section */}
        <div className="comments-section" style={{ marginTop: '16px', }}>
          <h4>Comments</h4>
          <input type="text" className="commentInput" />
          <button type="submit" style={{marginLeft: '80%'}}>Add comment</button>
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
