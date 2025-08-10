import {useState} from 'react';
import axios from 'axios';
import api from '../services/api';
import {useNavigate} from 'react-router';

function CreatePost(props) {
  // const [title, setTitle] = useState('Initial title');
  // const [slug, setSlug] = useState('');


  const initialState = {
    description: '',
  }
  const [state, setState] = useState(initialState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const navigate = useNavigate();

  // const onTextChange = (event) => {
  //   const {target: {value: inputText}} = event;
  //   setState(prevState => ({...prevState, text: inputText}))
  // }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  }



  const clickPost = async () => {
    console.log("Button clicked");
    // const userId = JSON.parse(localStorage.getItem("currentUser"));
    // console.log('this is the user id: ', userId);
    // axios.defaults.baseURL = 'http://88.200.63.148:9002';
    try {
      const resC = axios.get('/users/session');
      const formData = new FormData();
      formData.append('description', state.description);
      formData.append('file', selectedImageFile);
      // formData.append('user', userId);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        timeout: 30000,
      }

      console.log('kukie: ', resC);
      const res = await api.post('/objave', formData, config);
      // .then(res => {
      //   console.log('response: ', res)
      // })
      // .catch(err => console.err('err: ', err));
      console.log('After post');
      console.log('record id: ', res.data);
      navigate(`/success/${res.data.id}`);
      
    }
    catch(error) {
      console.error('error: ', error);
    }
  }
    


  return(
    <div className='new_post-container'>
      <div className='new_post'>
        <h1>New post</h1>
        <br/>
        <input onChange={({target: {value: description}}) => {
          setState(prevState => ({...prevState, description: description}))
        }} type='text' placeholder='Description' value={state.description} />
        <br></br>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {selectedImage && (
          <div>
            <p>Preview:</p>
            <img src={selectedImage} alt="Preview" width={200} />
          </div>
        )}
        <br></br>

        <button onClick={() => clickPost()}>Post</button>
      </div>
    </div>
  );
}

export default CreatePost;