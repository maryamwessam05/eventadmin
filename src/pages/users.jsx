import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import searchIcon from "../assets/search.svg";
import "./events.css";
import "./dashboard.css";
import { supabase } from "../supabase";
import del from "../assets/delete.svg";
import "./users.css";
import burger from "../assets/burger.svg";
import SearchBar from '../components/search';


const Users = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);
        const [search, setSearch] = useState("");  
    

    useEffect(() => {
        const getUsers = async () => {
            const res = await supabase.from("users").select("*");
            setUsers(res.data);
        };
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        const { error } = await supabase.from("users").delete().eq("id", id);
        if (!error) {
            setUsers(prev => prev.filter(user => user.id !== id));
        } else {
            console.error(error);
        }
    };

    const updateUserRole = async (id, newRole) => {
        const { error } = await supabase
            .from("users")
            .update({ role: newRole })
            .eq("id", id);

        if (!error) {
            setUsers(prev =>
                prev.map(u => u.id === id ? { ...u, role: newRole } : u)
            );
        } else {
            console.error(error);
        }
    };

    const getRoleClass = (role) => {
        switch (role) {
            case "admin": return "role-admin";
            case "customer": return "role-customer";
            default: return "";
        }
    };

    const filteredUsers = users
    .filter(user =>
        user.full_name_en?.toLowerCase().includes(search.toLowerCase()) ||
        user.full_name_ar?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );
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
                            <Title title="Users Management" description="Manage all your users in one place" />
                        </div>

                        <div className="filter">
                          <SearchBar type="text" placeholder="Search users..." value={search} onChange={setSearch}/>

                        </div>

                        <div className="table">
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th style={{paddingRight: "60px"}}>Name EN</th>
                                            <th style={{paddingRight: "40px"}}>Name AR</th>
                                            <th>Email</th>
                                            <th style={{paddingRight: "90px"}}>Phone</th>
                                            <th>Join Date</th>
                                            <th style={{paddingRight: "90px"}}>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    <div className="inti">{user.initials}</div>
                                                </td>
                                                <td>{user.full_name_en}</td>
                                                <td>{user.full_name_ar}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.updated_at}</td>
                                                <td>
                                                    <select
                                                        value={user.role || "customer"}
                                                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                                                        className={`role-select ${getRoleClass(user.role)}`}
                                                    >
                                                        <option value="admin">Admin</option>
                                                        <option value="customer">Customer</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteUser(user.id)} className="delete">
                                                        <img src={del} alt="Delete" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Users;