import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from './dashboard';
import Events from './events';

const AppRoutes = () => {
    return ( 
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/events" element={<Events />} />
                </Routes>
            </BrowserRouter>

        
        </>
     );
}
 
export default AppRoutes;
