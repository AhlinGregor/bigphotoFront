// import {useState} from 'react';
import axios from 'axios';
import React from 'react';
import OnePost from './onePost'
// import api from '../services/api';
// import {useNavigate} from 'react-router';

class Feed extends React.Component {
  constructor(props){
        super(props);
        this.state = {
            post: []
        }
    }

    componentDidMount(){
        this.getPost();
    }

  //   const gotoCreatePost = async () => {
  //   navigate(`/createPost`);
  // }

    render() {
      //const { currentUser, navigate } = this.props;
      return (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {
              this.state.post.map(post => <OnePost key={post.id} postId={post.id} description={post.description} username={post.username} imageUrl={`${process.env.REACT_APP_BACKEND}/uploads/${post.photo}`} profileImageUrl={`${process.env.REACT_APP_BACKEND}/pfps/${post.pfp}`} currentUser={this.props.currentUser} />)
            }
          </div>
        </>
      )
    }

    getPost() {
        axios.get(`${process.env.REACT_APP_BACKEND}/objave`)
            .then(({data: post}) => {
                //console.log('response', res);
                this.setState({
                    ...this.state, 
                    post
                })
            })
            .catch(err => {
                console.log('error: ', err);
            })
    }
}



export default Feed;