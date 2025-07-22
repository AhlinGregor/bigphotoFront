import {Component} from 'react';

class OnePost extends Component {
  render(){
    return(
      <div className='onePost'>
        <h2>{this.props.username}</h2>
        <img src={this.props.imageUrl} alt="Post" style={{ maxWidth: '300px' }} />
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default OnePost;