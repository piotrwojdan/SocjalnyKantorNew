import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PostsList from './PostsList';
import About from './About';
import Post from './Post';
// import Signup from './SignUp';

const Main = () => {
  return (
    <Routes> 
      <Route exact path='/' element={ <PostsList />} ></Route>
      <Route exact path='/posts' element={ <PostsList />} ></Route>
      <Route exact path='/post/:id' element={ <Post />} ></Route>
      <Route exact path='/editpost/:id' element={ <Post />} ></Route>
      {/* <Route exact path='/exchange' component={Exchange}></Route> */}
      {/* <Route exact path='/plots' component={Plots}></Route> */}
      <Route exact path='/about' component={About}></Route>
      {/* <Route exact path='/signup' component={SignUp}></Route>
      <Route exact path='/login' component={SignUp}></Route>
      <Route exact path='/logout' component={SignUp}></Route> */}
    </Routes>
  );
}

export default Main;