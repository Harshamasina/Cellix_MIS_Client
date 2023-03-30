import React from "react";
import { useEffect, useState } from "react";
import { BsArrowUpSquare } from "react-icons/bs";

const GoToTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    const goToBtn = () => {
        window.scrollTo({top:0, left:0, behavior:"smooth"});
    };

    const listenToScroll = () => {
        let heightToHidden = 250;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if(winScroll > heightToHidden){
            setIsVisible(true);
        }else{
           setIsVisible(false); 
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll);
    },[]);

    return(
        <div className="top-btn" onClick={goToBtn}>
            {isVisible && (<BsArrowUpSquare className="top-btn--icon" />)}
        </div>
    );
}

export default GoToTopBtn;