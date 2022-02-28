import React, { SyntheticEvent, useReducer, useState, useContext } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {TailSpin} from  "react-loader-spinner"
import {NameContext} from "../App"
import { API } from "../types";

interface InputState  {
   email: string
   password: string
}

interface InputAction{
    type: string
    payload: string
}

 

interface Props{
  setName: (name: string) =>void
}

const  Login =(props: Props)=>{

    const EMAIL = "EMAIL";

    const PASSWORD = "PASSWORD";

    const [loading, setLoading]= useState<Boolean>(false)

    const initialState:InputState = {
       email: "",
       password: "",
    }
  
const reducer = (state:InputState, action:InputAction) =>{
          switch(action.type){

             case EMAIL:
                 return {
                     ...state,
                     email: state.email = action.payload
                 }

            case PASSWORD: 
               return {
                   ...state,
                   password: state.password = action.payload
               }

               default: return state
          }
    }

    const [state, dispatch]= useReducer(reducer, initialState)

     const handleEmailChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
         dispatch({type: EMAIL, payload: event.target.value})
     }
   
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
         dispatch({type:PASSWORD, payload: event.target.value})
    }

    const navigate = useNavigate()

    const submitLoginDetails = async (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        setLoading(true);
        axios.post(API.loginAPI, {
          email: state.email.trim(),
          password: state.password.trim(),            
        },{
          withCredentials: true,
         
      }).then(res =>{
          if(res.status === 200){
              setLoading(true)
            console.log(res.data.message)
            console.log(res.status)
            props.setName(res.data.user.name);
            navigate("/userhome")
          }

        }).catch(error =>{
          setLoading(false);
          console.log(error.response)
          console.log(error.message)
        })

      // await fetch(API.loginAPI, {
      //   method: "POST",
      //   headers: {"Content-Type": "application/json"},
      //   credentials: 'include',
      //   body: JSON.stringify({
      //     email: state.email,
      //     password: state.password
      //   })
      // }).then(response =>{
      //   setLoading(true)
      //    console.log(response.status);
      //    console.log(response.headers)
      //     console.log(response.json);
          
      //     navigate("/home")
         
      // }).catch(error =>{
      //     setLoading(false);
      // })
    } 


     
    
    return(
        <section className="grid grid-cols-2 w-screen h-screen" >
            <div className="w-5/6 p-14 text-white bg-gradient-to-tr from-blue-400 to-gray-500 h-screen  font-poppins font-medium">
                <h3 className="text-3xl font-bold font-poppins tracking-widest">ArtWorld</h3>
                <p className="mt-5 font-normal tracking-wide">Discover the worlds Top NFT Designers and Creatives</p>
            </div>
            <div>
                <div className="flex flex-col justify-center h-screen space-y-4">
                <p className="font-poppins font-bold text-base">Username or Email Address</p>
                <input type="text" value={state.email} onChange= {handleEmailChange} className="bg-blue-50 outline-none w-80 rounded h-9 p-2" />
                  <p className="font-poppins font-bold text-base">Password</p>
                 <input type="text" value={state.password} onChange= {handlePasswordChange} className="bg-blue-50 outline-none w-80 rounded h-9 p-2" />
                  {loading ? <TailSpin
                   width={30}
                   height= {30}
                   ariaLabel= "loading"
                  />: <button onClick={submitLoginDetails} className="bg-blue-600 text-white w-48 h-8 rounded">Sign In</button>}
                </div>
            </div>
        </section>
    );
}

export default Login