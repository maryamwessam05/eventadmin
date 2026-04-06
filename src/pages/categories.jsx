import React from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import "./categories.css";
import "./dashboard.css";

const Categories = () => {
    return ( 
        <>
        <main>
            <div className="sidenav">
            <Sidebar /> 

            </div>
            <div className="content">
                <div className="header">
                    <div className="language">
                        <div className="selected">EN</div>
                        <div className="unactive">AR</div>
                    </div>
                    <img src={notif} alt="" />
                </div>
                <div className="maincont">
                    <div className="headercont">
                        <Title title="Categories Management" description="Organize your events by categories" />
                        <button className='add'>+ Add Category</button>
                    </div>

                 

                </div>
            </div>

        </main>
        </>
     );
}
 
export default Categories;