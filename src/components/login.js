import {useState} from 'react';
import axios from 'axios';
import api from '../services/api';
import {useNavigate} from 'react-router';
import { Link } from 'react-router-dom';

function Login(props) {
  // const [title, setTitle] = useState('Initial title');
  // const [slug, setSlug] = useState('');


  const initialState = {
    username: '',
    password: '',
  }
  const [state, setState] = useState(initialState);
  //const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();


  // const onTextChange = (event) => {
  //   const {target: {value: inputText}} = event;
  //   setState(prevState => ({...prevState, text: inputText}))
  // }



  const clickLogin = async () => {
    console.log("Clicked");
    axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND}`;
    try {
      console.log("before await")
      const res = await api.post('/users/login', {
        ...state
      })
      // .then(res => {
      //   console.log('response: ', res)
      // })
      // .catch(err => console.err('err: ', err));
      console.log(state.password);
      console.log(res.data);
      if (res.data.success) {
        console.log('record id: ', res);
        // const user = res.data.user;
        // setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        console.log(res.data.user.id);
        navigate(`/success/${res.data.user.id}`);
        window.location.reload();
      }
      else {
        console.log("Incorrect password!");
      }
      
    }
    catch(error) {
      console.error('error: ', error);
    }
  }
    


  return(
    <div className='login-container'>
      <div className='login'>
        <h1>Welcome back!</h1>
        <br/>
        <input onChange={({target: {value: inputUsername}}) => {
          setState(prevState => ({...prevState, username: inputUsername}))
        }} type='text' className='inputField' placeholder='Username' value={state.username} />
        <br/>

        <input onChange={({target: {value: inputPassword}}) => {
          setState(prevState => ({...prevState, password: inputPassword}))
        }} type='password' className='inputField' placeholder='Password' />
        <br/>


        <button className='buttons' onClick={() => clickLogin()}>Login</button>
        <br/>
        <p style={{ marginTop: '10px' }}>
          Don't have an account yet? You can register <Link to="/register">here</Link>!
        </p>

      </div>
    </div>
  )
}

export default Login;