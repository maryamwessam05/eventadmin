import React from 'react';
import "./link.css";
import { Link } from 'react-router-dom';

const SideLink = (props) => {
    return ( 
        <>

        <div className="linkcontainer">
            <Link to={props.to} className={props.class}>
                 <img src={props.icon} alt="" />
                <p>{props.text}</p>
            </Link>
        </div>
        
        </>
     );
}
 
export default SideLink;