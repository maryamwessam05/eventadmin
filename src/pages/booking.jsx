import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./booking.css";
import "./dashboard.css";
import {supabase} from "../supabase"
import Filterbtn from '../components/filterbtn';
import burger from "../assets/burger.svg";

const Booking = () => {
            const [sidebarOpen, setSidebarOpen] = useState(false);
    const [bookings, setBookings] = useState([]); 
    
    
useEffect(() => {
    const getEvents = async () => {
        const { data, error } = await supabase.from("bookings")
            .select(`booking_id, booking_reference, ticket_quantity, total_price, booking_status, payment_status, booked_at,
                users ( full_name_en ),
                events ( title_en )
            `);
        
        console.log("data:", data);
        console.log("error:", error);

        setBookings(data ?? []); 
    };
    getEvents();
}, []);

    const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
        case "confirmed": return "stat_green";
        case "pending": return "stat_yellow";
        case "cancelled": return "stat_red";
        default: return "";
    }
}

 const deleteBooking = async(id) =>{
        const res = await supabase.from("bookings").delete().eq("booking_id", id) ;
          setBookings(prev => prev.filter(booking => booking.booking_id !== id));

        console.log(res);
    }

    return ( 
        <>
        <main>
            <div className={`sidenav ${sidebarOpen ? "open" : ""}`}>
            <Sidebar onClose={() => setSidebarOpen(false)} /> 
            </div>
            <div className="content">
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
                        <Title title="Booking Management" description="Track and manage all event bookings" />
                    </div>

                    <div className="filter">
                        <div className="searchbar">
                        <img src={searchIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Search by user or event..."
                            
                        />
                        </div>
                        <div className="filterbtns">
                            <Filterbtn style="clicked" text="All" />
                            <Filterbtn style="disabeled" text="Confirmed" />
                            <Filterbtn style="disabeled" text="Pending" />
                            <Filterbtn style="disabeled" text="Cancelled" />
                        </div>
                    </div>

                    <div className="table">
                                        <div className="table-wrapper">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th style={{paddingRight: "86px"}}>User</th>
                                                <th style={{paddingRight: "108px"}}>Event</th>
                                                <th style={{paddingRight: "30px"}}>Reference</th>
                                                <th>Ticket Quantity</th>
                                                <th>Total Price</th>
                                                <th style={{paddingRight: "30px"}}>Status</th>
                                                <th style={{paddingRight: "30px"}}>Payment Status</th>
                                                <th style={{paddingRight: "46px"}}>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {bookings.map((booking) => {
                                                return (
                                                <tr key={booking.booking_id}>
                                                    
                                                    <td>{booking.users?.full_name_en}</td>
                                                    <td>{booking.events?.title_en}</td>
                                                    <td>{booking.booking_reference}</td>
                                                    <td>{booking.ticket_quantity}</td>
                                                    <td>{booking.total_price}</td>
                                                    <td className={getStatusClass(booking.booking_status)}>{booking.booking_status}</td>
                                                    <td className={getStatusClass(booking.payment_status)}>{booking.payment_status}</td>
                                                    <td onClick={()=>deleteBooking(booking.booking_id)} ><span className='deletebtn'>Delete</span></td>
                    
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
 
export default Booking;