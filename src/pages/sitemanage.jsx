import React from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import "./events.css";
import "./dashboard.css";
import save from "../assets/save.svg"

const SiteManage = () => {
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
                        <Title title="Site Content Management" description="Manage your site's content and structure" />
                        <button className='add'>
                            <img src={save} alt="" />
                              <span>Save Changes</span>     
                        </button>

                    </div>


                </div>
            </div>

        </main>
        </>
     );
}
 
export default SiteManage;