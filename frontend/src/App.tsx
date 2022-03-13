import './App.css';
import Login from './pages/login';
import SignIn from './pages/sigin';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/home';
import Post from './pages/Post';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { API } from './types';
import Header from './components/header/header';

import Posts from "./components/posts/posts"
import React from 'react';
import axios from 'axios';
import UserHome from './pages/userHome';
import CreatePosts from './pages/createPosts';
import UserPosts from './pages/userPosts';
 

export const NameContext = React.createContext("");

function App() {

  const  [name, setName] = useState("")

  // const dispatch = useAppDispatch()

  useEffect(()=>{
       
   (
       async () =>{
           const response = await fetch(API.fetchUser, {
               headers: {"Content-Type": "application/json"},
               credentials: "include"
           })

           const content =  await response.json();

              setName(content.user.name);
              
            
       }
   )();

  },[name])


 useEffect (()=>{
   
 })

  return (
  
     <>
        
         <Router>
        {/* <Header name = {name} /> */}
       <Routes>
         <Route path='/' element={<Home name = {name} setName= {setName} />}></Route>
         <Route path='/sigin' element = {<SignIn />}> </Route>
         <Route path='/login' element= {<Login setName = {setName}/>}></Route>
         <Route path='/home' element = {<Post name = {name}  setName ={setName} />}> </Route>
         <Route path = '/userhome' element ={<UserHome name = {name} setName= {setName} />}> </Route>
         <Route path = '/posts' element = {<CreatePosts name = {name} setName ={setName}/>}></Route>
         <Route path = '/userpost' element= {<UserPosts name = {name} setName= {setName} />} ></Route>
       </Routes>
      </Router> 
        
      </>
      
  );
}

export default App;

