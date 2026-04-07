import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./events.css";
import {supabase} from "../supabase"
import "./dashboard.css";
import Filterbtn from '../components/filterbtn';
import star from "../assets/star.svg"
import del from "../assets/delete.svg";

const Feedback = () => {
    const [feedback, setFeedback] = useState([" "]); 
        
            useEffect(()=> {
                const getFeedback = async() => {
                    const res = await supabase.from("support_feedback").select("* , events (title_en , title_ar) , support_messages (user_id)");
                    setFeedback(res.data);
                }
                getFeedback();
        
            },[])
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

                        <div className="table">
                    <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th style={{paddingRight: "86px"}}>User</th>
                            <th style={{paddingRight: "56px"}}>Event AR</th>
                            <th style={{paddingRight: "30px"}}>Event EN</th>
                            <th style={{paddingRight: "56px"}}>Rating</th>
                            <th style={{paddingRight: "56px"}}>Comment</th>
                            <th>Date</th>
                            <th style={{paddingRight: "46px"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {feedback.map((feedback) => {
                            return (
                            <tr key={feedback.id}>
                                <td>
                                    <div className="inti">{feedback.initials}</div>
                                </td>
                                <td>{feedback.events?.title_en}</td>
                                <td>{feedback.full_name_ar}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.phone}</td>
                                <td>{feedback.updated_at}</td>
                                <td>{feedback.role}</td>
                                <td>
                                    <div className="bookingc">
                                        {feedback.bookings}
                                        </div>
                                    </td>
                                <td>{feedback.password}</td>
                                <td>
                                    <button className="delete">
                                    <img src={del} alt="Delete" />
                                    </button>
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
            </div>

        </main>
        </>
     );
}
 
export default Feedback;