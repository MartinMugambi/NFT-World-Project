 import CreatePost from "../components/createpost/createPost"
import Header from "../components/header/header";
import {useAppSelector} from "../redux/index"
interface Props{
    name: string,
    setName: (name: string) =>void
}


const Post = (props: Props) =>{
     
    return(
        <>
        <Header name={props.name} setName= {props.setName} />
        <CreatePost />
        </>
    );
} 

export default Post;