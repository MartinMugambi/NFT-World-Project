import axios from "axios";
import React, {useEffect} from "react";
import { useState } from "react";
 import {useAppDispatch, useAppSelector} from  "../../redux/index"
import { fetchPost } from '../../redux/slicePost';
import { API } from "../../types";
import {TailSpin} from "react-loader-spinner"

interface Post {
    ID: number,
    title: string,
    desc: string,
    image: string,    
}

interface Props{
  name: string
  setName: (name: string) => void
}
const Posts = (props: Props) =>{

  props.setName(props.name);
  const dispatch = useAppDispatch()

  const [data, setData] = useState<Post[]>([])

  const[loading, setoading] = useState(true);

  useEffect(()=>{

    axios.get(API.fetchAllPost, {
      withCredentials: true
    }).then(response =>{
       setData(response.data.post);
       setoading(false)
    }).catch(error =>{
       setoading(false)
    })
     
   },[])
 
 
    console.log(data);
    
       const PostList = data.map(item =>(
               <div key={item.ID}  className= "hover:opacity-70 rounded-xl shadow-xl hover:scale-110 hover:transition-all hover:ease-in-out h-72 sm:w-48 sm:h-64">
           <img src= {item.image} alt ="post_image" width={250} height = {250} className="object-cover rounded-t-xl" />
                <p className="font-poppins text-base mt-1 font-bold p-2">{item.title}</p>
           </div>
       ) )
      

       if(props.name === ""){
          return (
            <div className="mb-7">
              <h1 className="text-center font-bold font-poppins text-xl mt-4">NFT MarketPlace</h1>
            <section className="grid grid-cols-4 place-items-center p-2 mt-3 space-y-6 cursor-pointer sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
               {loading &&  <div className="flex justify-center items-center"><TailSpin 
                 width={50}
                 height ={50}
               />  </div>}
               
              {PostList}
            </section>
             <div className="flex justify-center items-center">
            
             </div>
            </div>
          )
       } else {
        return (
          <div className="mb-7">
            <h1 className="text-center font-bold font-poppins text-xl mt-4">Check out some Popular Nfts</h1>
          <section className="grid grid-cols-4 place-items-center p-2 mt-3 space-y-6 cursor-pointer">
             {loading &&  <div className="flex justify-center items-center"><TailSpin 
               width={50}
               height ={50}
             />  </div>}
             
            {PostList}
          </section>
          
          </div>
        )

       }

   
}

export default React.memo(Posts);