import {useNavigate} from 'react-router-dom'
import SearchIcon from "@material-ui/icons/Search"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import  {useAppSelector} from "../redux/index" 
import axios from 'axios'
import {API} from "../types"

interface NameProp{
  name: string
  setName: (name: string) => void
}

const Header = (props: NameProp) =>{

    const navigate = useNavigate();
    const navigateLogin = () =>{
      navigate('/login')
    }
   
    
    const user = useAppSelector((state)=> state.user.user);
    
    const navigateToSignUp = () =>{
        navigate('/sigin')
    }

    
     const navigateToPost = () =>{
         navigate('/posts')
     }
   
     const navigateToUserPost = () =>{
         navigate('/userpost')
     }


     const navigateToUserHome = () =>{
        navigate("/userhome")
     }
     const logoutUser = async () =>{
            
        const response = await fetch(API.logoutUser, {
            credentials: "include",
            method: "POST"
        })
       
        if(response.status === 200){
            props.setName("");
            return navigate('/');
        }
        
     }
   
    if(props.name === "") {
        return (
            <header className="flex space-x-5 w-screen shadow h-20 justify-between font-poppins text-base p-3 text-gray-900 items-center bg-white cursor-pointer font-medium">
        <div className="flex space-x-8 ml-4">
           <h3 className="tracking-wide">ArtWorld</h3>
            <p>Inspirations</p>
            <p>Post Work</p>
            <p>Market Place</p>
            <p>Hire Artist</p>
        </div>
        <div className="flex space-x-5">
             <button onClick={navigateLogin} className="bg-blue-600 ring-4 ring-blue-300 text-white w-20 h-10 rounded hover:opacity-70">Sign In</button>
             <button onClick={navigateToSignUp} className="bg-blue-600 text-white w-20 h-10 rounded hover:opacity-70">Sign up</button>
             <button></button>
        </div>
        </header> 
        );
        
    } else {
        return  (
            <header className="flex space-x-5 justify-between items-center font-poppins p-6 w-screen shadow-sm h-16">
            <div className="flex space-x-5 cursor-pointer">
             <p onClick={navigateToUserHome} className="text-base font-semibold font-poppins">Art World</p>
             <p onClick={navigateToPost} className= "hover:text-blue-300 hover:scale-105">CreatePost</p>
             <p onClick={navigateToUserPost} className= "hover:text-blue-300 hover:scale-105">My Posts</p>
            </div>
            <div className="flex space-x-5 items-center font-poppins cursor-pointer">
              <div className="bg-slate-300 rounded-md">
                  <SearchIcon  className="ml-1 text-gray-400"  />
                  <input type="text" className= "outline-none p-1 w-20 border-none bg-slate-300 rounded-md placeholder:text-sm" placeholder="Search" />
              </div>
               <AccountCircleIcon  />
              <button className="bg-blue-600 text-white w-20 h-9 rounded">Upload</button>
               <p>{props.name}</p>
               <button  onClick={logoutUser} className="bg-blue-600 text-white w-20 h-9 rounded">Logout</button>
            </div>
            
            </header> 
        )
    }

          
    
}

export default Header


 