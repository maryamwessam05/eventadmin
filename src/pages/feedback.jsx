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
import burger from "../assets/burger.svg";


const Feedback = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [feedback, setFeedback] = useState([" "]); 
        
            useEffect(()=> {
                const getFeedback = async() => {
                    const res = await supabase.from("support_feedback").select("* , events (title_en , title_ar) , support_messages (user_id) , users(full_name_en , initials)");
                    setFeedback(res.data);
                }
                getFeedback();
        
            },[])

            const deleteFeedback = async(id) =>{
            const res = await supabase.from("support_feedback").delete().eq("id", id) ;
              setFeedback(prev => prev.filter(feedback => feedback.id !== id));
    
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
                        <div className="table">
                    <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th style={{paddingRight: "86px"}}>User</th>
                            <th style={{paddingRight: "30px"}}>Event EN</th>
                            <th style={{paddingRight: "56px"}}>Event AR</th>
                            <th style={{paddingRight: "56px"}}>Rating</th>
                            <th style={{paddingRight: "56px"}}>Comment EN</th>
                            <th style={{paddingRight: "56px"}}>Comment AR</th>
                            <th>Date&Time</th>
                            <th style={{paddingRight: "46px"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {feedback.map((feedback) => {
                            return (
                            <tr key={feedback.id}>
                                <td>
                                    <div className="inti">{feedback.users?.initials}</div>
                                </td>
                                <td>{feedback.users?.full_name_en}</td>
                                <td>{feedback.events?.title_en}</td>
                                <td>{feedback.events?.title_ar}</td>
                                <td>
                                    <div className="bookingc">
                                    {feedback.rating}
                                        </div>
                                    </td>
                                <td>{feedback.comment_en}</td>
                                <td>{feedback.comment_ar}</td>
                                <td>{feedback.updated_at}</td>
                               <td>
                                    <button onClick={()=>deleteFeedback(feedback.id)} className="delete">
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

        </main>
        </>
     );
}
 
export default Feedback;