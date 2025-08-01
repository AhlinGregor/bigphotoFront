import {useState, useEffect} from 'react';
// import axios from 'axios';
import api from '../services/api';
import {useNavigate} from 'react-router';

function Profile(props) {

  const initialState = {
    username: '',
    password: '',
    bio: '',
  }

  const [state, setState] = useState(initialState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setState(prev => ({
        ...prev,
        username: storedUser.username || '',
        bio: storedUser.bio || '',
        // password usually not stored in localStorage for security reasons
      }));
    }
  }, []);

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



  const clickUpdate = async () => {
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
    <div className='profile-container'>
      <div className='profile'>
        <h1>Welcome {state.username}!</h1>
        <br/>
        <input onChange={({target: {value: username}}) => {
          setState(prevState => ({...prevState, username: username}))
        }} type='text' placeholder='Username' value={state.username} readOnly />
        <br></br>

        <input onChange={({target: {value: password}}) => {
          setState(prevState => ({...prevState, password: password}))
        }} type='password' placeholder='Password' value={state.password} />
        <br></br>

        {/* <input onChange={({target: {value: bio}}) => {
          setState(prevState => ({...prevState, bio: bio}))
        }} type='text' placeholder='Bio' value={state.bio} /> */}
        <textarea onChange={({target: {value: bio}}) => {
          setState(prevState => ({...prevState, bio: bio}))
        }} placeholder='Bio' value={state.bio} />
        <br></br>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {selectedImage && (
          <div>
            <p>Preview:</p>
            <img src={selectedImage} alt="Preview" width={200} />
          </div>
        )}
        <br></br>

        <button onClick={() => clickUpdate()}>Update</button>
      </div>
    </div>
  );
}

export default Profile;