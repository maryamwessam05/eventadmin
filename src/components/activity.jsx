import React from 'react';
import "./activity.css";

const Activity = (props) => {
    return ( 
        <>
        
            <div className="activity">
                <div className="person">
                    <div className="initial">{props.initial}</div>
                    <div className="namedeet">
                        <h3>{props.name}</h3>
                        <span>{props.sub}</span>
                    </div>
                </div>
                    <h4>{props.time}</h4>
            </div>
        </>
     );
}
 
export default Activity;