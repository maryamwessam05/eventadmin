import React from 'react';
import "./filterbtn.css";

const Filterbtn = (props) => {
    return ( 
        <>
        <button className={`filterbtn ${props.style}`} onClick={props.onClick}>
            {props.text}
        </button>
        
        </>
     );
}
 
export default Filterbtn;