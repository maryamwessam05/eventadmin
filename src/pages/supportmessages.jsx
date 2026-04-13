import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./events.css";
import "./dashboard.css";
import {supabase} from "../supabase"
import del from "../assets/delete.svg";
import Filterbtn from '../components/filterbtn';
import check from "../assets/check.svg"
import "./supportmessages.css"

const SupportMessages = () => {
    const [supportmsgs, setSupportMsgs] = useState([" "]); 
        
            useEffect(()=> {
                const getSupportMsgs = async() => {
                    const res = await supabase.from("support_messages").select(`*, users (full_name_en, full_name_ar, email, initials)`);
                    setSupportMsgs(res.data);
                }
                getSupportMsgs();
        
            },[])

            const deleteSuppmsg = async(id) =>{
            const res = await supabase.from("support_messages").delete().eq("support_id", id) ;
              setSupportMsgs(prev => prev.filter(supportmsgs => supportmsgs.support_id !== id));
    
            console.log(res);
        }
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
                        <Title title="Support Messages" description="Manage customer support inquiries" />
                    </div>

                    <div className="filter">
                        <div className="searchbar">
                        <img src={searchIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            
                        />
                        </div>
                        <div className="filterbtns">
                            <Filterbtn style="clicked" text="All" />
                            <Filterbtn style="disabeled" text="Pending" />
                            <Filterbtn style="disabeled" text="Resolved" />
                        </div>
                    </div>

                <div className="categcont">
                    {supportmsgs.map((support)=>{
                        return (
                            <div key={support.support_id} className="sup">
                                <div className="row1sup">
                                    <div className="info">
                                        <div className="inti">
                                            {support.users?.initials}
                                        </div>

                                        <div className="nameemail">
                                            <h3>{support.users?.full_name_en}</h3>
                                            <span>{support.users?.email}</span>
                                        </div>

                                    </div>

                                    <div className={support.status === "closed" ? "red" : "green"}>
                                        {support.status}
                                    </div>
                                </div>

                                <div className="supcontent">
                                    <h2>{support.subject_en}</h2>
                                    <h5>{support.message_en}</h5>
                                </div>

                                <div className="supcontentar">
                                    <h2>{support.subject_ar}</h2>
                                    <h5>{support.message_ar}</h5>
                                </div>
                                
                                <div className="events">
                                    <span>{support.updated_at}</span>
                                    <div className="action-btns">
                                        <button className="edit">
                                        <img src={check} alt="Edit" />
                                        </button>
                                        <button onClick={()=>deleteSuppmsg(support.support_id)} className="delete">
                                        <img src={del} alt="Delete" />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )

                    })}
                    </div>

                </div>
            </div>

        </main>
        </>
     );
}
 
export default SupportMessages;