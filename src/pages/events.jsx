import React from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./events.css";
import "./dashboard.css";
import Filterbtn from '../components/filterbtn';
import edit from "../assets/edit.svg";
import del from "../assets/delete.svg";
import EditModal from '../components/editmodal';

const Events = () => {
    const openModal = () => {
        const modal = document.querySelector(".editmodal");
        modal.style.display = "flex";
    }
    return ( 
        <>
        <main>
            <div className="sidenav">
            <Sidebar /> 

            </div>
            <EditModal />
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
                        <Title title="Events Management" description="Manage all your events in one place" />
                        <button className='add'>+ Add Event</button>
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

                    <div className="table">
                        <table>
                            <thead>
                            <tr>
                                <th style={{ width: "30%", textAlign: "left" }}>Event Name</th>
                                <th style={{ width: "15%", textAlign: "left" }}>Category</th>
                                <th style={{ width: "15%", textAlign: "left" }}>Date</th>
                                <th style={{ width: "10%", textAlign: "left" }}>Price</th>
                                <th style={{ width: "15%", textAlign: "left" }}>Status</th>
                                <th style={{ width: "15%", textAlign: "left" }}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ width: "30%", textAlign: "left" }}>Event 1</td>
                                    <td style={{ width: "15%", textAlign: "left" }}>Music</td>
                                    <td style={{ width: "15%", textAlign: "left" }}>2023-10-15</td>
                                    <td style={{ width: "10%", textAlign: "left" }}>$50</td>
                                    <td style={{ width: "15%", textAlign: "left" }}>Active</td>
                                    <td style={{ width: "15%", textAlign: "left" }}>
                                        <button onClick={openModal} className="edit">
                                            <img src={edit} alt="Edit" />
                                        </button>
                                        <button className="delete">
                                            <img src={del} alt="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </main>
        </>
     );
}
 
export default Events;