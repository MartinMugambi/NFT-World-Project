import React, { useState, useReducer,useEffect } from "react";
import axios from "axios";
import { API } from "../../types";
import { TailSpin } from "react-loader-spinner";
import {useNavigate} from "react-router-dom"


interface inputValues{
    title: string,
    description: string,
    file: any | string | null,
}


interface InputAction {
    type: string,
    payload: string | any | null
}

interface Props{
    name: string,
    setName: (name: string) => void
}
const CreatePost = () =>{

   const TITLE: string = "TITLE";
   const DESCRIPTION: string = "DESCRIPTION";
    const FILE: any  = "FILE";

   const initialState: inputValues= {
       title: "",
       description: "",
       file: "",
   }


   
     
   
  const reducer = (state:inputValues, action:InputAction) =>{
           switch(action.type){
               case TITLE:
                   return {
                       ...state,
                       title: state.title = action.payload,
                   }

                   case DESCRIPTION:
                       return{
                           ...state,
                           description: state.description = action.payload,
                       }

                       case FILE:
                           return {
                               ...state,
                               file: state.file = action.payload,
                           }

                           default: return state;
           }
  }

    const [loading, setLoading]=  useState<Boolean>(false);

    const [state, dispatch] = useReducer(reducer, initialState )


    const handleTitleChange =(event: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch({type: TITLE, payload: event.target.value})
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        dispatch({type: DESCRIPTION, payload: event.target.value})
    }

    const handleFileChange = (event:any) =>{
       dispatch({type: FILE, payload: event.currentTarget.files[0]})
       
    }

   const navigate = useNavigate()

     


    const submitPost=  async (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        setLoading(true)
        const data = new FormData();
        data.append("title", state.title)
        data.append("description", state.description)
        data.append("image", state.file)

        axios.post(API.createPostApi, data, {
            withCredentials: true,
        }).then(response =>{
              setLoading(true)
              console.log(response.status);
              console.log(response.data)
              navigate("/userhome")
        }).catch(error =>{
            setLoading(false);
            console.log(error.response);
            console.log(error.message)
            
        })
    }

    return (
        <section className="flex flex-col space-y-5 justify-center items-center h-screen font-poppins w-screen">
        <form className="flex flex-col space-y-4" encType="multipart/form-data">
         <h5 className="text-center uppercase font-poppins font-medium">Create Your Post</h5>
         <h1 className="font-bold text-2xl tracking-wider">Express your <span className="text-blue-600">Art</span></h1>
          <h3 className="font-bold text-base">Title</h3>
           <input type= "text" className="border-2 border-black p-1 outline-none  rounded" placeholder="Title" value={state.title} onChange ={handleTitleChange}/>
           <h3 className="font-bold text-base">Description</h3>
            <textarea className="outline-none border-2 border-black p-1 resize-none  h-1/5 rounded" placeholder="description" value={state.description} onChange= {handleDescriptionChange} ></textarea>
           <h3 className="font-bold text-base">Select image file to upload</h3>
           <input type="file" className="p-1 h-10"  onChange = {handleFileChange}  data-testid="file"/>
           {loading ? <TailSpin width={30} height={30} ariaLabel= "loading" />: <button className="bg-blue-600 text-white w-24 h-11 rounded" onClick={submitPost}>Submit</button>}
        </form>
        </section>
    );
}

export default CreatePost