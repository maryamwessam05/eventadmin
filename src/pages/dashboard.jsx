import React, { useEffect , useState } from 'react';
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
import burger from "../assets/burger.svg"
import linechart from "../assets/LineChart.svg";
import barchart from "../assets/BarChart.svg";
import Activity from '../components/activity';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const bookingsData = [
  { month: 'Jan', bookings: 45 },
  { month: 'Feb', bookings: 52 },
  { month: 'Mar', bookings: 68 },
  { month: 'Apr', bookings: 85 },
  { month: 'May', bookings: 95 },
  { month: 'Jun', bookings: 110 },
];
const revenueData = [
  { month: 'Jan', revenue: 4500 },
  { month: 'Feb', revenue: 5200 },
  { month: 'Mar', revenue: 6800 },
  { month: 'Apr', revenue: 8500 },
  { month: 'May', revenue: 9500 },
  { month: 'Jun', revenue: 11000 },
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
                             <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={bookingsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="bookings"
                                    stroke="#2F91F8"
                                    strokeWidth={3}
                                    dot={{ fill: '#2F91F8', r: 6 }}
                                />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="table">
                            <div className="tableheader">
                                <img src={tabicon2} alt="" />
                                <h3>Revenue</h3>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                }}
                            />
                            <Bar dataKey="revenue" fill="#C8F22B" radius={[12, 12, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
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