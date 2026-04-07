import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./events.css";
import "./dashboard.css";
import {supabase} from "../supabase"
import del from "../assets/delete.svg";
import "./users.css"

const Users = () => {
    const [users, setUsers] = useState([" "]); 
    
        useEffect(()=> {
            const getUsers = async() => {
                const res = await supabase.from("users").select("*");
                setUsers(res.data);
            }
            getUsers();
    
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
                        <Title title="Users Management" description="Manage all your users in one place" />
                        
                    </div>

                    <div className="filter">
                        <div className="searchbar">
                        <img src={searchIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            
                        />
                        </div>
                    </div>

                    <div className="table">
                    <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th style={{paddingRight: "86px"}}>Name EN</th>
                            <th style={{paddingRight: "56px"}}>Name AR</th>
                            <th style={{paddingRight: "30px"}}>Email</th>
                            <th style={{paddingRight: "56px"}}>Phone</th>
                            <th style={{paddingRight: "56px"}}>Join Date</th>
                            <th>Role</th>
                            <th>Booking</th>
                            <th>Password</th>
                            <th style={{paddingRight: "46px"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => {
                            return (
                            <tr key={user.id}>
                                <td>
                                    <div className="inti">{user.initials}</div>
                                </td>
                                <td>{user.full_name_en}</td>
                                <td>{user.full_name_ar}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.updated_at}</td>
                                <td>{user.role}</td>
                                <td >
                                    <div className="bookingc">
                                        {user.bookings}
                                        </div>
                                    </td>
                                <td>{user.password}</td>
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

        </main>
        </>
     );
}
 
export default Users;