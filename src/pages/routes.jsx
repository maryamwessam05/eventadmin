import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from './dashboard';
import Events from './events';
import Booking from './booking';
import Categories from './categories';
import Users from './users';
import SupportMessages from './supportmessages';
import Feedback from './feedback';
import SiteManage from './sitemanage';
import NavContent from './navcontent';

const AppRoutes = () => {
    return ( 
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/events" element={<Events />} />
                    <Route path='/booking' element={<Booking />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/support' element={<SupportMessages />} />
                    <Route path='/feedback' element={<Feedback />} />
                    <Route path='/sitecontent' element={<SiteManage />} />
                    <Route path='/sitenavcontent' element={<NavContent />} />

                </Routes>
            </BrowserRouter>

        
        </>
     );
}
 
export default AppRoutes;
