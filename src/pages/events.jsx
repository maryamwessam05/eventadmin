import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./events.css";
import "./dashboard.css";
import Filterbtn from '../components/filterbtn';
import edit from "../assets/edit.svg";
import del from "../assets/delete.svg";
import EditModal from '../modals/editmodal';
import {supabase} from "../supabase"
import AddModal from '../modals/addmodal';

const Events = () => {
    const [events, setEvents] = useState([" "]); 

    useEffect(()=> {
        const getEvents = async() => {
            const res = await supabase.from("events").select("*");
            setEvents(res.data);
        }
        getEvents();

    },[])


    const openModal = () => {
        const modal = document.querySelector(".editmodal");
        modal.style.display = "flex";
    }

    const openAddModal = () => {
        const modal = document.querySelector(".addmodal");
        modal.style.display = "flex";
    }
    const deleteEvent = ((id) =>{
            console.log(id)
    })
    
    return ( 
        <>
        <main>
            <div className="sidenav">
            <Sidebar /> 

            </div>
            <EditModal type="event" modalname="Event" />
            <AddModal type="event" modalname="Event" />            <div className="content">
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
                        <button  className='add' onClick={openAddModal}>+ Add Event</button>
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
                    <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th style={{paddingRight: "86px"}}>Title EN</th>
                            <th style={{paddingRight: "56px"}}>Title AR</th>
                            <th style={{paddingRight: "30px"}}>Description EN</th>
                            <th style={{paddingRight: "56px"}}>Description AR</th>
                            <th>Location EN</th>
                            <th>Location AR</th>
                            <th style={{paddingRight: "46px"}}>Venue EN</th>
                            <th style={{paddingRight: "36px"}}>Venue AR</th>
                            <th>Price</th>
                            <th>Capacity</th>
                            <th>Available Tickets</th>
                            <th>Status</th>
                            <th>Is Featured</th>
                            <th>Is Trending</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map((event) => {
                            return (
                            <tr key={event.id}>
                                <td>
                                <img className="event-img" src={event.image_url} alt={event.title_en} />
                                </td>
                                <td>{event.title_en}</td>
                                <td>{event.title_ar}</td>
                                <td>{event.description_en}</td>
                                <td >{event.description_ar}</td>
                                <td>{event.location_en}</td>
                                <td>{event.location_ar}</td>
                                <td>{event.venue_en}</td>
                                <td>{event.venue_ar}</td>
                                <td>{event.price}</td>
                                <td>{event.capacity}</td>
                                <td>{event.available_tickets}</td>
                                <td>{event.status}</td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>



                                <td>
                                <div className="action-btns">
                                    <button onClick={openModal} className="edit">
                                    <img src={edit} alt="Edit" />
                                    </button>
                                    <button onClick={()=>deleteEvent(event.id)} className="delete">
                                    <img src={del} alt="Delete" />
                                    </button>
                                </div>
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    </div>
                    </div>

                </div>
            </div>

        </main>
        </>
     );
}
 
export default Events;