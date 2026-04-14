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
    const [activeFilter, setActiveFilter] = useState("All");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [bookings, setBookings] = useState([]); 
    
    
useEffect(() => {
    const getBooking = async () => {
        const { data, error } = await supabase.from("bookings")
            .select(`booking_id, booking_reference, ticket_quantity, total_price, booking_status, payment_status, booked_at,
                users ( full_name_en ),
                events ( title_en )
            `);
        
        console.log("data:", data);
        console.log("error:", error);

        setBookings(data ?? []); 
    };
    getBooking();
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

    const updateBookingStatus = async (id, newStatus) => {
    const { error } = await supabase
        .from("bookings")
        .update({ booking_status: newStatus })
        .eq("booking_id", id);

    if (!error) {
        setBookings(prev =>
            prev.map(b =>
                b.booking_id === id
                    ? { ...b, booking_status: newStatus }
                    : b
            )
        );
    } else {
        console.log(error);
    }

};
const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === "All") return true;
    return booking.booking_status?.toLowerCase() === activeFilter;
});

const filters = [
    { label: "All", value: "All" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" }
];

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
                            {filters.map((filter) => (
                                <Filterbtn
                                    key={filter.value}
                                    style={activeFilter === filter.value ? "clicked" : "disabeled"}
                                    text={filter.label}
                                    onClick={() => setActiveFilter(filter.value)}
                                />
                            ))}
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
                                            {filteredBookings.map((booking) => {
                                                return (
                                                <tr key={booking.booking_id}>
                                                    
                                                    <td>{booking.users?.full_name_en}</td>
                                                    <td>{booking.events?.title_en}</td>
                                                    <td>{booking.booking_reference}</td>
                                                    <td>{booking.ticket_quantity}</td>
                                                    <td>{booking.total_price}</td>
                                                    <td className='selectbooking'>
                                                        <select
                                                            value={booking.booking_status || ""}
                                                            onChange={(e) =>
                                                                updateBookingStatus(booking.booking_id, e.target.value)
                                                            }
                                                            className={getStatusClass(booking.booking_status)}
                                                        >
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="pending">Pending</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </td>
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