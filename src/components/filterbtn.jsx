import React from 'react';
import "./filterbtn.css";

const Filterbtn = (props) => {
    return ( 
        <>
        <button className={props.style}>
            <img src={props.icon} alt="" />
            {props.text}
        </button>
        
        </>
     );
}
 
export default Filterbtn;