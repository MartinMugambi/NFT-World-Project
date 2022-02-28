import Header from "../components/header"
import UserPost from "../components/userPost"

interface NameProps{
  name: string,
  setName: (name: string)=> void
  
}

const UserPosts = (props: NameProps) =>{

    return(
      <>
       <Header name = {props.name} setName= {props.setName}/>
       <UserPost />
      </>
    )
}

export default UserPosts