import {useState} from 'react';
import axios from 'axios';
import React from 'react';
import OnePost from './onePost'
import api from '../services/api';
import {useNavigate} from 'react-router';

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
      return (
        <>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {
              this.state.post.map(post => <OnePost key={post.id} description={post.description} username={post.username} imageUrl={`http://88.200.63.148:9002/uploads/${post.photo}`} />)
            }
          </div>
        </>
      )
    }

    getPost() {
        axios.get('http://88.200.63.148:9002/objave')
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