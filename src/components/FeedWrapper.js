import React from 'react';
import { useNavigate } from 'react-router-dom';
import Feed from './feed';
import Navbar from './Navbar';

const FeedWrapper = () => {
  const navigate = useNavigate();
  return <Feed navigate={navigate} />;
};

export default FeedWrapper;
