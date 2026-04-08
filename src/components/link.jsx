import React from 'react';
import "./link.css";
import { NavLink } from 'react-router-dom';

const SideLink = (props) => {
    return ( 
        <div className="linkcontainer">
            <NavLink 
                to={props.to}
                end={props.to === "/"} 
                className={({ isActive }) =>
                    isActive ? "link linkactive" : "link"
                }
            >
                <img src={props.icon} alt="" />
                <p>{props.text}</p>
            </NavLink>
        </div>
    );
}
 
export default SideLink;