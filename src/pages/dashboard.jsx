import React from 'react';
import "./dashboard.css";
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import StatCard from '../components/statcard';
import stat1 from "../assets/staticon01.svg";
import stat2 from "../assets/staticon02.svg";
import stat3 from "../assets/staticon03.svg";
import stat4 from "../assets/staticon04.svg";
import stat5 from "../assets/staticon05.svg";
import tabicon1 from "../assets/tabicon01.svg";
import tabicon2 from "../assets/tabicon02.svg";
import linechart from "../assets/LineChart.svg";
import barchart from "../assets/BarChart.svg";
import Activity from '../components/activity';

const Dashboard = () => {
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
                    <Title title="Dashboard Overview" description="Welcome back! Here's what's happening with your events." />

                    <div className="statcards">
                        <StatCard title="Total Events" value="120" stat="↑ 12%" image={stat1} />
                        <StatCard title="Total Bookings" value="1,847" stat="↑ 8%" image={stat2} />
                        <StatCard title="Total Users" value="3,429" stat="↑ 15%" image={stat3} />
                        <StatCard title="Revenue" value="$45.2K" stat="↑ 20%" image={stat4} />
                        <StatCard title="Avg Rating" value="4.8" stat="↑ 0.2%" image={stat5} />
                    </div>

                    <div className="rowtable">
                        <div className="table">
                            <div className="tableheader">
                                <img src={tabicon1} alt="" />
                                <h3>Recent Activity</h3>
                            </div>
                            <img src={linechart} alt="" />
                        </div>
                        <div className="table">
                            <div className="tableheader">
                                <img src={tabicon2} alt="" />
                                <h3>Revenue</h3>
                            </div>
                            <img src={barchart} alt="" />
                        </div>
                    </div>

                    <div className="table">
                        <h3>Recent Activity</h3>
                        <div className="msgs">
                            <Activity initial="JD" name="John Doe" sub="Booked a ticket for Music Fest 2024" time="2 mins ago" />
                            <Activity initial="AS" name="Alice Smith" sub="Cancelled her booking for Art Expo 2024" time="10 mins ago" />
                            <Activity initial="BW" name="Bob Williams" sub="Left a review for Tech Conference 2024" time="30 mins ago" />
                            <Activity initial="EM" name="Emily Davis" sub="Updated her profile information" time="1 hour ago" />
                        </div>
                    </div>
                </div>
            </div>

        </main>
        
        </>
    );
}
 
export default Dashboard;