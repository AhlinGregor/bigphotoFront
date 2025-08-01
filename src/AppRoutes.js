import {Component} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
// import App from './App';
//import LessonDetails from './components/Lesson/LessonDetails';
//import CreateNews from './components/News/crreate-news';
//import SuccessPage from './components/shared/success/SuccessPage';
import Login from './components/login';
import Register from './components/register';
import Feed from './components/feed';
import CreatePost from './components/createPost';
import FeedWrapper from './components/FeedWrapper';
import Layout from './components/Layout';
import Profile from './components/profile';

export class AppRoutes extends Component {
  render() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={currentUser ? <Feed /> : <Navigate to="/login" />} />
            <Route path='success/:id' element={<FeedWrapper />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route path='/createPost' element={<CreatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;