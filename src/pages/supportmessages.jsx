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
import burger from "../assets/burger.svg";
import SearchBar from '../components/search';


const SupportMessages = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [supportmsgs, setSupportMsgs] = useState([" "]);
    const [search, setSearch] = useState("");  
     
        
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
        const filteredSupp = supportmsgs.filter((support) => {
            if (activeFilter === "All") return true;
            return support.status?.toLowerCase() === activeFilter.toLowerCase();
        })
        .filter(support =>
        support.users?.full_name_en?.toLowerCase().includes(search.toLowerCase()) ||
        support.users?.email?.toLowerCase().includes(search.toLowerCase()) ||
        support.subject_en?.toLowerCase().includes(search.toLowerCase()) || 
        support.subject_ar?.toLowerCase().includes(search.toLowerCase()) || 
        support.message_en?.toLowerCase().includes(search.toLowerCase()) || 
        support.message_ar?.toLowerCase().includes(search.toLowerCase()) 


    );
            const status = ["All", "Closed", "Open"];

    const updateSupportStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "open" ? "closed" : "open";

    const { error } = await supabase
        .from("support_messages")
        .update({ status: newStatus })
        .eq("support_id", id);

    if (!error) {
        setSupportMsgs(prev =>
            prev.map(item =>
                item.support_id === id
                    ? { ...item, status: newStatus }
                    : item
            )
        );
    } else {
        console.log(error);
    }
};

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
                        <Title title="Support Messages" description="Manage customer support inquiries" />
                    </div>

                    <div className="filter">
                      <SearchBar type="text" placeholder="Search messages..." value={search} onChange={setSearch}/>

                        <div className="filterbtns">
                            {status.map((stat) => (
                                <Filterbtn
                                    key={stat}
                                    text={stat}
                                    style={activeFilter === stat ? "clicked" : "disabeled"}
                                    onClick={() => setActiveFilter(stat)}
                                />
                            ))}
                        </div>
                    </div>

                <div className="categcont">
                    {filteredSupp.map((support)=>{
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
                                        {support.status?.toLowerCase() !== "closed" && (
                                        <button
                                            onClick={() =>
                                                updateSupportStatus(support.support_id, support.status)
                                            }
                                            className="check"
                                        >
                                            <img src={check} alt="Close" />
                                        </button>
                                    )}
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