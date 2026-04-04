import React from 'react';
import "./sidebar.css";
import logo from "../assets/logo.svg"
import SideLink from './link';
import icon1 from "../assets/icon01.svg"
import icon2 from "../assets/icon02.svg"
import icon3 from "../assets/icon03.svg"
import icon4 from "../assets/icon04.svg"
import icon5 from "../assets/icon05.svg"
import icon6 from "../assets/icon06.svg"
import icon7 from "../assets/icon07.svg"
import icon8 from "../assets/icon08.svg"
import prof from "../assets/prof.svg"
import logout from "../assets/logout.svg"

const Sidebar = () => {
    return (  
        <>  
            <div className="sidebar">
                <img src={logo} alt="" />

                <div className="links">
                    <SideLink to="/" class="linkactive" icon={icon1} text="Dashboard" />
                    <SideLink to="/events" class="link" icon={icon2} text="Events" />
                    <SideLink to="/bookings" class="link" icon={icon3} text="Bookings" />
                    <SideLink to="/categories" class="link" icon={icon4} text="Categories" />
                    <SideLink to="/users" class="link" icon={icon5} text="Users" />
                    <SideLink to="/support" class="link" icon={icon6} text="Support Messages" />
                    <SideLink to="/feedback" class="link" icon={icon7} text="Feedback   " />
                    <SideLink to="/sitecontent" class="link" icon={icon8} text="Site Content" />
                </div>

                <div className="log">
                    <div className="prof">
                        <img src={prof} alt="" />
                        <div className="name">
                            <h3>John Doe</h3>
                            <p>admin@eventadmin.com</p>
                        </div>
                    </div>
                    <img src={logout} alt="" />
                </div>
            </div>
        
        
        </>
    );
}
 
export default Sidebar;