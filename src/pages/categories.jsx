import React, { useEffect , useState } from 'react';
import Sidebar from '../components/sidebar';
import notif from "../assets/notif.svg";
import Title from '../components/title';
import "./categories.css";
import "./dashboard.css";
import {supabase} from "../supabase"
import AddModal from '../modals/addmodal';
import EditModal from '../modals/editmodal';
import del from "../assets/delete.svg";
import edit from "../assets/edit.svg";

const Categories = () => {
    const [categories, setCategories] = useState([" "]); 
    
        useEffect(()=> {
            const getCategories = async() => {
                const res = await supabase.from("categories").select("*");
                setCategories(res.data);
            }
            getCategories();
    
        },[])
    const openModal = () => {
        const modal = document.querySelector(".addmodal");
        modal.style.display = "flex";
    }
    const openeditModal = () => {
        const modal = document.querySelector(".editmodal");
        modal.style.display = "flex";
    }

     const deleteCategory = async(id) =>{
            const res = await supabase.from("categories").delete().eq("category_id", id) ;
              setCategories(prev => prev.filter(category => category.category_id !== id));
    
            console.log(res);
        }

    return ( 
        <>
        <main>
            <div className="sidenav">
            <Sidebar /> 

            </div>
            <EditModal type="category" modalname="Category" />

           <AddModal type="category" modalname="Category" onEventAdded={(newCategory) => setCategories(prev => [...prev, newCategory])} />
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
                        <Title title="Categories Management" description="Organize your events by categories" />
                        <button onClick={openModal}  className='add'>+ Add Category</button>
                    </div>

                    <div className="categcont">
                    {categories.map((category)=>{
                        return (
                            <div key={category.category_id} className="cat">
                                <div className="row1cat">
                                    <div className="catimg">
                                        <img src={category.image_url} alt="" />
                                    </div>
                                    <div className="action-btns">
                                        <button onClick={openeditModal} className="edit">
                                        <img src={edit} alt="Edit" />
                                        </button>
                                        <button onClick={()=>deleteCategory(category.category_id)}  className="delete">
                                        <img src={del} alt="Delete" />
                                        </button>
                                    </div>


                                </div>
                                <div className="label">
                                    <h2>{category.title_en}</h2>
                                    <h4>{category.title_ar}</h4>
                                </div>
                                <div className="label">
                                    <h2>{category.description_en}</h2>
                                    <h4>{category.description_ar}</h4>
                                </div>
                                
                                <div className="events">
                                    <span>Events</span>
                                    <h5>{category.number}</h5>
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
 
export default Categories;