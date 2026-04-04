import React from 'react';
import "./statcard.css"

const StatCard = (props) => {
    return ( 
        <>
            <div className="statcard">
                <div className="text">
                    <h5>{props.title}</h5>
                    <h1>{props.value}</h1>
                    <span>{props.stat}</span>
                </div>

                <img src={props.image} alt="" />
            </div>
        </>
     );
}
 
export default StatCard;