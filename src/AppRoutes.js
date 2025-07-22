import {Component} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
//import LessonDetails from './components/Lesson/LessonDetails';
//import CreateNews from './components/News/crreate-news';
//import SuccessPage from './components/shared/success/SuccessPage';
import Login from './components/login';
import Register from './components/register';

export class AppRoutes extends Component {
  render() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="lesson" element={<LessonDetails />} />
          <Route path='news-create' element={<CreateNews />} />
          <Route path='success/:id' element={<SuccessPage />} /> */}
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;