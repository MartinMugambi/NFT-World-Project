import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../types";
import {TailSpin} from "react-loader-spinner"
import { log } from "console";

interface Post {
    ID: number,
    title: string,
    desc: string,
    image: string,    
}

const UserPost = () =>{

    const [data, setData] = useState<Post[]>([])

  const[loading, setoading] = useState(true);

  const [delet, setDelete] = useState<boolean>(false);

  const [id, setId] = useState<number>()

  useEffect(()=>{

    axios.get(API.fetchUserPost, {
      withCredentials: true
    }).then(response =>{
       setData(response.data.post);
       setoading(false)
    }).catch(error =>{
       setoading(false)
    })
     
   },[])



   console.log("Here id the", id);

   
   const deletePost = async () =>{
     
    axios.delete(`https://nft-go-server.herokuapp.com/posts/${id}`, {
        withCredentials: true,
    }).then(response =>{
        setDelete(true)
    }).catch(error =>{
        console.log(error.message);
    })
    
   }

   const PostList = data.map(item =>(
    <div key={item.ID} onClick={()=>setId(item.ID)} className= "rounded-xl shadow-xl  hover:transition-all hover:ease-in-out">
<img src= {item.image} alt ="post_image" width={250} height = {250} className="object-contain rounded-t-xl hover:opacity-75" />
     <p className="font-poppins text-base mt-1 font-bold p-2">{item.title}</p>
     <div className="flex justify-end space-x-4 mb-2 cursor-pointer">
         <button className="bg-red-500 text-white w-16 p-1 font-poppins rounded-md" onClick={deletePost}>Delete</button>
         <button className="text-white bg-purple-500 w-16 p-1 font-poppins rounded-md ml-4">Edit</button>
     </div>
</div>
) )

return (
    <div>
      <h1 className="text-center font-bold font-poppins text-xl mt-4">My Posts</h1>
    <section className="grid grid-cols-4 place-items-center p-2 mt-3 space-y-6 cursor-pointer">
       {loading &&  <div className="flex justify-center items-center"><TailSpin 
         width={50}
         height ={50}
       />  </div>}
        
        {data.length === 0 ? <p className="font-poppins font-bold text-2xl text-center">No Post Found</p>: PostList}
    
    </section>
    
    </div>
   
  )
}

export default UserPost;