import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import  PinterestIcon from '@material-ui/icons/Pinterest'
const Footer = () =>{
     return(
         <footer className="w-screen bg-slate-100 grid grid-cols-4 space-y-4 p-5">
           <div className="flex flex-col space-y-4">
             <h3 className="font-poppins text-base tracking-wider" data-testid= "heading">ArtWorld</h3>
             <p className="font-poppins text-base max-w-xs" data-testid="paragraph">ArtWorld is the worlds leading commuinty for craetive NFT marketplace</p>
              <div className="flex space-x-4">
                <FacebookIcon data-testid="social-icon" />
                <TwitterIcon data-testid="social-icon" />
                <InstagramIcon data-testid="social-icon"/>
                <PinterestIcon data-testid="social-icon"/>
              </div>
           </div>
           <div>
             <h1 className="font-poppins font-bold text-lg">For Designers</h1>
              <p>Explore NFT Market</p>
              <p>Design Blog</p>
              <p>Overtime Podcast</p>
              <p>Post a review</p>
              <p>Resources</p>
           </div>
           <div>
             <h1 className="font-poppins font-bold text-lg">Company</h1>
             <p>About</p>
             <p>Careers</p>
             <p>Support</p>
             <p>Media Kit</p>
             <p>Testomials</p>
           </div>
           <div className="">
               <h1 className="font-poppins font-bold text-lg">Design Resources</h1>
               <p>Frelancing</p>
               <p>Design Hiring</p>
               <p>Design Portfolio</p>
               <p>Design Education</p>
               <p>Creative Process</p>
           </div>
         </footer>
     );
}

export default Footer