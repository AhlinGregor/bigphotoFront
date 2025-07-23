import {Component} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
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

export class AppRoutes extends Component {
  render() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path='success/:id' element={<FeedWrapper />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='/createPost' element={<CreatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;