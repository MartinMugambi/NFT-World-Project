import banner from '../assets/banner.png'
import {useNavigate} from "react-router-dom"
const Banner = () =>{

    const navigate = useNavigate();

    const navigateToRegisterPage = () =>{
        navigate("/sigin")
    }
    
    return(
        <section className="w-screen h-96 bg-slate-100 flex justify-around items-center p-9">
          <div>
              <h1 className="font-poppins text-3xl font-bold max-w-sm">Discover the World's top NFT collection & creatives</h1>
              <p className="max-w-sm tracking-wide leading-6 mt-3">Artworld is the leading platform  to find and showcase creative and unique nfts in the marketplace
              </p>
              <button onClick={navigateToRegisterPage} className="w-20 h-10 rounded bg-blue-600 mt-4 text-white font-poppins font-medium">sign up</button>
          </div>
          <div>
              <img src={banner} alt="banner_logo" className="mix-blend-multiply object-contain" />
          </div>
        </section>
    );
}

export default Banner;