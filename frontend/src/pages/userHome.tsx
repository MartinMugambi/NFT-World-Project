import Banner from "../components/banner";
import Footer from "../components/footer";
import Header from "../components/header";
import Posts from "../components/posts";

interface NameProps{
  name: string,
  setName: (name: string)=> void
  
}

const UserHome = (props: NameProps) =>{
   props.setName(props.name)
    return(
      <>
      <Header name={props.name} setName ={props.setName} />
        <Posts name= {props.name} setName= {props.setName} />
       <Footer />
      </>
    );
}

export default UserHome