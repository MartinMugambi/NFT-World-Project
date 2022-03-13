import Banner from "../components/banner/banner";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Posts from "../components/posts/posts";

interface NameProps{
  name: string,
  setName: (name: string) =>void
  
}

const Home = (props: NameProps) =>{
   
    return(
      <>
      <Header name={props.name} setName= {props.setName}/>
       <Banner />
        <Posts  name = {props.name} setName = {props.setName}/>
       <Footer />
      </>
    );
}

export default Home