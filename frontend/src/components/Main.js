import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PostsList from './PostsList';
import About from './About';
import Post from './Post';
import Login from './Login';
// import Signup from './SignUp';

const Main = (props) => {
  return (
    <Routes>
      {/*<Route exact path='/' element={ <PostsList posts = {props.posts}/>} ></Route>*/}
      {/*<Route exact path='/posts' element={ <PostsList posts = {props.posts}/>} ></Route>*/}
      {/*<Route exact path='/post/:id' element={ <Post posts = {props.posts}/>} ></Route>*/}
      {/*<Route exact path='/editpost/:id' element={ <Post posts = {props.posts}/>} ></Route>*/}
      {/* <Route exact path='/exchange' component={Exchange}></Route> */}
      {/* <Route exact path='/plots' component={Plots}></Route> */}
      <Route exact path='/about' component={About}></Route>
              {/*<Route exact path='/about' ><About /></Route>*/}

      <Route exact path='/login' component={Login}></Route>
      {/* <Route exact path='/signup' component={SignUp}></Route>
      <Route exact path='/login' component={SignUp}></Route>
      <Route exact path='/logout' component={SignUp}></Route> */}
    </Routes>
  );
}

export default Main;