import {useState} from 'react';
// import axios from 'axios';
import api from '../services/api';
import {useNavigate} from 'react-router';
import { Link } from 'react-router-dom';

function Register(props) {
  // const [title, setTitle] = useState('Initial title');
  // const [slug, setSlug] = useState('');


  const initialState = {
    username: '',
    password: '',
    bio: '',
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



  const clickRegister = async () => {
    console.log("Button clicked");
    // axios.defaults.baseURL = 'http://88.200.63.148:9002';
    try {
      const formData = new FormData();
      formData.append('username', state.username);
      formData.append('password', state.password);
      formData.append('bio', state.bio);
      formData.append('file', selectedImageFile);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await api.post('/users/newUser', formData, config);
      // .then(res => {
      //   console.log('response: ', res)
      // })
      // .catch(err => console.err('err: ', err));
      console.log('record id: ', res.data);

      const loginRes = await api.post('/users/login', {
        username: state.username,
        password: state.password,
      });

      const user = loginRes.data.user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(`/success/${user.id}`);
      window.location.reload();
      
    }
    catch(error) {
      console.error('error: ', error);
    }
  }
    


  return(
    <div className='register-container'>
      <div className='register'>
        <h1>Welcome!</h1>
        <br/>
        <input onChange={({target: {value: username}}) => {
          setState(prevState => ({...prevState, username: username}))
        }} type='text' className='inputField' placeholder='Username' value={state.username} />
        <br></br>

        <input onChange={({target: {value: password}}) => {
          setState(prevState => ({...prevState, password: password}))
        }} type='password' className='inputField' placeholder='Password' value={state.password} />
        <br></br>

        {/* <input onChange={({target: {value: bio}}) => {
          setState(prevState => ({...prevState, bio: bio}))
        }} type='text' placeholder='Bio' value={state.bio} /> */}
        <textarea onChange={({target: {value: bio}}) => {
          setState(prevState => ({...prevState, bio: bio}))
        }} placeholder='Bio' value={state.bio} style={{
          padding: '8px 16px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          outline: 'none',
        }} />
        <br></br>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {selectedImage && (
          <div>
            <p>Preview:</p>
            <img src={selectedImage} alt="Preview" width={200} />
          </div>
        )}
        <br></br>

        <button className='buttons' onClick={() => clickRegister()}>Register</button>
        <br/>
        <p style={{ marginTop: '10px' }}>
          Already have an account? You can login <Link to="/login">here</Link>!
        </p>
      </div>
    </div>
  );
}

export default Register;