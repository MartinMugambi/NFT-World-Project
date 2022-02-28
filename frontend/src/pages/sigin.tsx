import axios from "axios";
import React, { useState, useEffect, useReducer, SyntheticEvent } from "react";
import {TailSpin} from  "react-loader-spinner"
import {useNavigate} from "react-router-dom"
import { API } from "../types";

interface Values{
    name: string,
    username: string,
    email: string,
    password: string,
}


interface InputAction {
    type: string,
    payload: string
}


 
const SignIn =() =>{

    const NAME = "NAME";
    const USERNAME = "USERNAME";
    const EMAIL = "EMAIL";
    const PASSWORD = "PASSWORD";
   
    const inputValues: Values = {
      name: "",
      username: "",
      email: "",
      password: "",
    }

    const  [loading, setLoading] = useState<Boolean>(false)

    const reducer = (state:Values, action:InputAction) =>{
            switch(action.type){
                case NAME:
                    return {
                        ...state,
                        name: state.name = action.payload
                    }
                    case USERNAME:
                        return {
                            ...state,
                            username: state.username = action.payload,
                        }

                    case EMAIL:
                        return{
                            ...state,
                            email: state.email = action.payload,
                        }

                     case PASSWORD:
                         return {
                             ...state,
                             password: state.password = action.payload,
                         }

                      default: return state;
            }
    }

    const[state, dispatch ]= useReducer(reducer, inputValues)


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch({type: NAME, payload: event.target.value})
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch({type: USERNAME, payload: event.target.value})
    }

    const handleEmailChange =(event: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch({type: EMAIL, payload: event.target.value})
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch({type: PASSWORD, payload: event.target.value})
    }

    useEffect(()=>{
     
    },[])

    //navigation to 

    const navigate = useNavigate();

    //subbmit Post\

    const submitRegisterDetails = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true)
        axios.post(API.registerApi,  {
            name: state.name,
            username: state.username,
            email: state.email,
            password: state.password,
         }, {
            withCredentials: true,
            
    
        }).then(res =>{
              if (res.status === 200){
                 setLoading(true)
                 console.log(res.status)
                 console.log(res.data)
                 console.log(res.headers)
                 console.log(res.statusText)
                 navigate("/login");
              } 
         }).catch(err =>{
        
             setLoading(false)
             console.log(err.response.data.message);
             console.log(err.message)
         })
               
    }

     
   
    return(
        <section className="grid grid-cols-2 w-screen h-screen">
            <div className="w-5/6 p-14 text-white bg-gradient-to-tr from-blue-400 to-gray-500 h-screen  font-poppins font-medium">
                <h3 className="text-3xl font-bold font-poppins tracking-widest">ArtWorld</h3>
                <p className="mt-5 font-normal tracking-wide">Discover the worlds Top NFT Designers and Creatives</p>
            </div>
            <div>
                <div className="flex flex-col  justify-center h-screen space-y-4">
                  <div className="flex space-x-4">
                      <div>
                          <p className="text-base font-bold font-poppins">Name</p>
                          <input type="text"  value= {state.name} onChange = {handleNameChange} className="bg-blue-50 outline-none w-40 rounded h-9 p-2" />
                      </div>
                      <div>
                          <p className="text-base font-bold font-poppins">Username</p>
                          <input type="text" value={state.username} onChange= {handleUsernameChange} className="bg-blue-50 outline-none w-40 rounded h-9 p-2" />
                      </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                      <div>
                          <p className="text-base font-bold font-poppins">Email</p>
                          <input type="text"  value={state.email} onChange={handleEmailChange} className="bg-blue-50 outline-none w-80 rounded h-9 p-2" />
                      </div>
                      <div>
                          <p className="text-base font-bold font-poppins">Password</p>
                          <input type="text" value={state.password} onChange= {handlePasswordChange} className="bg-blue-50 outline-none w-80 rounded h-9 p-2" />
                      </div>

                  </div>

                  {loading ?  <TailSpin
                    width={30}
                    height= {30}
                    ariaLabel= "loading"
                   />:  <button onClick={submitRegisterDetails} className="bg-blue-600 text-white w-48 h-8 rounded">Sign Up</button> }
                </div>
            </div>
        </section>
    );
}

export default SignIn