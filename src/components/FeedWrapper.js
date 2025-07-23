import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Feed from './feed';
// import Navbar from './Navbar';

const FeedWrapper = () => {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  return <Feed navigate={navigate} currentUser={currentUser} />;
};

export default FeedWrapper;
