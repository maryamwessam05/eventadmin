import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./events.css";
import "./dashboard.css";
import burger from "../assets/burger.svg"
import Filterbtn from '../components/filterbtn';
import edit from "../assets/edit.svg";
import del from "../assets/delete.svg";
import EditModal from '../modals/editmodal';
import {supabase} from "../supabase"
import AddModal from '../modals/addmodal';
import SearchBar from '../components/search';

const Events = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [events, setEvents] = useState([" "]); 
    const [search, setSearch] = useState("");  

    useEffect(()=> {
        const getEvents = async() => {
            const res = await supabase.from("events").select(`
            *,
            event_categories (
            category_id,
            categories (
                title_en,
                title_ar
            )
            )
        `);
            setEvents(res.data);
        }
        getEvents();

    },[])


    const [selectedEvent, setSelectedEvent] = useState(null);

const openModal = (event) => {
    setSelectedEvent(event);
    const modal = document.querySelector(".editmodal");
    modal.style.display = "flex";
}

    const openAddModal = () => {
        const modal = document.querySelector(".addmodal");
        modal.style.display = "flex";
    }
    
    const deleteEvent = async (id) => {
    const relatedTables = ["bookings", "event_categories", "event_feedback", "support_feedback"];    
    for (const table of relatedTables) {
        const { error } = await supabase.from(table).delete().eq("event_id", id);
        if (error) {
            console.error(`Failed to delete from ${table}:`, error);
            return;
        }
    }
    const { error } = await supabase.from("events").delete().eq("event_id", id);
    if (error) {
        console.error("Failed to delete event:", error);
        return;
    }
    setEvents(prev => prev.filter(event => event.event_id !== id));
    
}


const filteredEvents = events
    .filter(event =>
        activeFilter === "All" ||
        event.event_categories?.some(
            ec => ec.categories?.title_en?.toLowerCase() === activeFilter.toLowerCase()
        )
    )
    .filter(event =>
        event.title_en?.toLowerCase().includes(search.toLowerCase()) ||
        event.title_ar?.toLowerCase().includes(search.toLowerCase()) ||
        event.location_en?.toLowerCase().includes(search.toLowerCase())
    );
    const categories = ["All", "Music", "Conference", "Food", "Art", "Sports", "Technology"];

    
    return ( 
        <>
        <main>
            <div className={`sidenav ${sidebarOpen ? "open" : ""}`}>
            <Sidebar onClose={() => setSidebarOpen(false)} /> 
            </div>
            <EditModal 
    type="event" 
    modalname="Event" 
    data={selectedEvent}
    onEventUpdated={(updatedEvent) => setEvents(prev => 
        prev.map(e => e.event_id === updatedEvent.event_id ? updatedEvent : e)
    )}
/>
            <AddModal 
                type="event" 
                modalname="Event" 
                onEventAdded={(newEvent) => setEvents(prev => [...prev, newEvent])} 
            />          <div className="content">
                <div className="header">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="burger">
                        <img src={burger} alt="" />
                    </button>
                    <div className="headaction">

                    <div className="language">
                        <div className="selected">EN</div>
                        <div className="unactive">AR</div>
                    </div>
                    <img src={notif} alt="" />
                    </div>
                </div>
                <div className="maincont">
                    <div className="headercont">
                        <Title title="Events Management" description="Manage all your events in one place" />
                        <button  className='add' onClick={openAddModal}>+ Add Event</button>
                    </div>

                    <div className="filter">
                        <SearchBar type="text" placeholder="Search events..." value={search} onChange={setSearch}/>
    
                        <div className="filterbtns">
                            {categories.map(cat => (
                                <Filterbtn
                                    key={cat}
                                    text={cat}
                                    style={activeFilter === cat ? "clicked" : "disabeled"}
                                    onClick={() => setActiveFilter(cat)}
                                />
                            ))}
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
                            <th>Category</th>
                            <th>Location EN</th>
                            <th>Location AR</th>
                            <th style={{paddingRight: "46px"}}>Venue EN</th>
                            <th style={{paddingRight: "36px"}}>Venue AR</th>
                            <th style={{paddingRight: "64px"}}>Date</th>
                            <th>Time</th>
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
                        {filteredEvents.map((event) => {
                            return (
                            <tr key={event.event_id}>
                                <td>
                                <img className="event-img" src={event.image_url} alt={event.title_en} />
                                </td>
                                <td>{event.title_en}</td>
                                <td>{event.title_ar}</td>
                                <td><div className="desc-cell">{event.description_en}</div></td>
                                <td><div className="desc-cell">{event.description_ar}</div></td>
                                <td>
                                {event.event_categories?.map(ec => ec.categories?.title_en).join(", ") || "—"}
                                </td>
                                <td>{event.location_en}</td>
                                <td>{event.location_ar}</td>
                                <td>{event.venue_en}</td>
                                <td>{event.venue_ar}</td>
                                <td>{event.date}</td>
                                <td>{event.time}</td>
                                <td>{event.price}</td>
                                <td>{event.capacity}</td>
                                <td>{event.available_tickets}</td>
                                <td>{event.status}</td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>



                                <td>
                                <div className="action-btns">
                                    <button onClick={() => openModal(event)}  className="edit">
                                    <img src={edit} alt="Edit" />
                                    </button>
                                    <button onClick={()=>deleteEvent(event.event_id)} className="delete">
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