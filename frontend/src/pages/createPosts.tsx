import CreatePost from "../components/createpost/createPost"
import Header from "../components/header/header"

interface NameProps{
    name: string,
    setName: (name: string) =>void
    
  }

const CreatePosts = (props: NameProps) =>{
    return(
        <>
         <Header name = {props.name} setName= {props.setName}/>
         <CreatePost />
        </>
    )
}

export default CreatePosts