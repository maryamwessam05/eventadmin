import React from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./events.css";
import "./dashboard.css";
import Filterbtn from '../components/filterbtn';
import star from "../assets/star.svg"

const Feedback = () => {
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
                        <Title title="Feedback & Reviews" description="Monitor customer feedback and ratings" />
                    </div>

                    <div className="filter">
                        <div className="searchbar">
                        <img src={searchIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Search feedback..."
                            
                        />
                        </div>
                        <div className="filterbtns">
                            <Filterbtn style="clicked" text="All"/>
                            <Filterbtn style="disabeled" text="5" icon={star} />
                            <Filterbtn style="disabeled" text="4" icon={star} />
                            <Filterbtn style="disabeled" text="3" icon={star} />
                            <Filterbtn style="disabeled" text="2" icon={star} />
                            <Filterbtn style="disabeled" text="1" icon={star} />
                        </div>
                    </div>

                </div>
            </div>

        </main>
        </>
     );
}
 
export default Feedback;