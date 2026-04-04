import React from 'react';
import "./filterbtn.css";

const Filterbtn = (props) => {
    return ( 
        <>
        <button className={props.style}>
            {props.text}
        </button>
        
        </>
     );
}
 
export default Filterbtn;