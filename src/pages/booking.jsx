import React from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./booking.css";
import "./dashboard.css";
import Filterbtn from '../components/filterbtn';

const Booking = () => {
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
                        <Title title="Booking Management" description="Track and manage all event bookings" />
                    </div>

                    <div className="filter">
                        <div className="searchbar">
                        <img src={searchIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            
                        />
                        </div>
                        <div className="filterbtns">
                            <Filterbtn style="clicked" text="All" />
                            <Filterbtn style="disabeled" text="Music" />
                            <Filterbtn style="disabeled" text="Conference" />
                            <Filterbtn style="disabeled" text="Food" />
                            <Filterbtn style="disabeled" text="Art" />
                            <Filterbtn style="disabeled" text="Sports" />
                        </div>
                    </div>

                </div>
            </div>

        </main>
        </>
     );
}
 
export default Booking;