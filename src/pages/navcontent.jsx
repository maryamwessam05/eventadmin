
import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import "./events.css";
import "./dashboard.css";
import save from "../assets/save.svg"
import {supabase} from "../supabase"
import "./sitemanage.css"


const NavContent = () => {
    const [siteNav, setSiteNav] = useState([" "]); 
    
    useEffect(()=> {
        const getSiteNav = async() => {
            const res = await supabase.from("site_nav_links").select("*");
            setSiteNav(res.data);    
        }
        getSiteNav();
        
    },[])
    console.log(siteNav)
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
                    <Title title="Navbar Management" description="Manage your site's navbar content and structure" />
                    <button className='add'>
                        <img src={save} alt="" />
                          <span>Save Changes</span>     
                    </button>

                </div>

                <div className="sitemanage">
 
                        {siteNav.map((navsite) => {
                                return(
                                    <div className="siteinput">
                                        <h1>{navsite.label_en} NavLink</h1>
                                        <form action="">
                                            <div className="group">
                                                <label htmlFor="">Label EN</label>
                                                <input type="text" value={navsite.label_en}/>

                                            </div>
                                            <div className="group">
                                                <label htmlFor="">Label EN</label>
                                                <input type="text" value={navsite.label_ar}/>

                                            </div>
                                            <div className="group">
                                                <label htmlFor="">Url</label>
                                                <input type="text" value={navsite.url}/>

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
 
export default NavContent;