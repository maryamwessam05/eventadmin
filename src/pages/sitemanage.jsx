import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import "./events.css";
import "./dashboard.css";
import save from "../assets/save.svg"
import {supabase} from "../supabase"
import "./sitemanage.css"
import burger from "../assets/burger.svg";


const SiteManage = () => {
                const [sidebarOpen, setSidebarOpen] = useState(false);

    const [site, setSite] = useState([" "]); 
    
        useEffect(()=> {
            const getSite = async() => {
                const res = await supabase.from("site_content").select("*");
                setSite(res.data);    
            }
            getSite();
            
        },[])
        console.log(site)
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
                        <Title title="Site Content Management" description="Manage your site's content and structure" />
                        <button className='add'>
                            <img src={save} alt="" />
                              <span>Save Changes</span>     
                        </button>

                    </div>

                    <div className="sitemanage">
     
                            {site.map((site) => {
                                    return(
                                        <div className="siteinput">
                                            <h1>{site.label} Section</h1>
                                            <form action="">
                                                <div className="group">
                                                    <label htmlFor="">Title EN</label>
                                                    <input type="text" value={site.title_en}/>

                                                </div>
                                                <div className="group">
                                                    <label htmlFor="">Title AR</label>
                                                    <input type="text" value={site.title_ar}/>

                                                </div>
                                                <div className="group">
                                                    <label htmlFor="">Description EN</label>
                                                    <input type="text" value={site.desc_en}/>

                                                </div>
                                                <div className="group">
                                                    <label htmlFor="">Description AR</label>
                                                    <input type="text" value={site.desc_ar}/>

                                                </div>

                                            </form>
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
 
export default SiteManage;