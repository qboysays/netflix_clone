import React,{useEffect,useState} from 'react'
import logo from './Netflix_Logo_RGB.png'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if (window.scrollY>100) {
                handleShow(true);
                
            } else { 
                handleShow(false);
                
            }
        });
        return ()=>{
            window.removeEventListener("scroll");
        };

       
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <a href="https://www.linkedin.com/in/qalandar-sayed/">
            <img 
            className="nav_logo"
            src={logo}
            alt="Netflix_logo"
            />
            <img 
            className="nav_avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix_avatar"
            />
            </a>
            
        </div>
    )
}

export default Nav
