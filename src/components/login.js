import {useState} from 'react';
// import axios from 'axios';
import api from '../services/api';
import {useNavigate} from 'react-router';

function Login(props) {
  // const [title, setTitle] = useState('Initial title');
  // const [slug, setSlug] = useState('');


  const initialState = {
    username: '',
    password: '',
  }
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  // const onTextChange = (event) => {
  //   const {target: {value: inputText}} = event;
  //   setState(prevState => ({...prevState, text: inputText}))
  // }



  const clickLogin = async () => {
    // axios.defaults.baseURL = 'http://88.200.63.148:9002';
    try {
      const res = await api.post('/users/login', {
        ...state
      })
      // .then(res => {
      //   console.log('response: ', res)
      // })
      // .catch(err => console.err('err: ', err));
      console.log('record id: ', res);
      navigate(`/success/${res.data.id}`);
      
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
        <input onChange={({target: {value: inputTitle}}) => {
          setState(prevState => ({...prevState, title: inputTitle}))
        }} type='text' placeholder='Username' value={state.title} />
        <br/>

        <input onChange={({target: {value: inputSlug}}) => {
          setState(prevState => ({...prevState, slug: inputSlug}))
        }} type='text' placeholder='Password' />
        <br/>


        <button onClick={() => clickLogin()}>Login</button>
      </div>
    </div>
  )
}

export default Login;