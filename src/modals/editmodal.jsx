import React from 'react';
import "./editmodal.css";

const EditModal = (props) => {
    const closeModal = () => {
        const modal = document.querySelector(".editmodal");
        modal.style.display = "none";
    }
    
    return ( 
        <>
        <div className="editmodal">
            <div className="editcont">
                <h1>Edit {props.modalname}</h1>
                <form action="">
                    <div className="formrow">
                        <div className="grp">
                            <label htmlFor="">{props.modalname} Name</label>
                            <input type="text" placeholder='Event Name' value="" />
                        </div>
                        <div className="grp">
                            <label htmlFor="">{props.modalname} Name (AR)</label>
                            <input type="text" placeholder='Event Name' value="" />
                        </div>
                    </div>
                    <div className="formrow">
                        <div className="grp">
                            <label htmlFor="">Category</label>
                            <div className="select-wrapper">
                            <select>
                                <option>Music</option>
                                <option>Conference</option>
                                <option>Food</option>
                                <option>Art</option>
                                <option>Sports</option>
                            </select>

                            </div>
                        </div>
                    </div>
                    <div className="formrow">
                        <div className="grp">
                            <label htmlFor="">Date&Time</label>
                            <input type="datetime-local" value="" />
                        </div>
                        <div className="grp">
                            <label htmlFor="">Price ($)</label>
                            <input type="number" placeholder='0.00$' />
                        </div>
                    </div>
                    <div className="formrow">
                        <div className="grp">
                            <label htmlFor="">Description</label>
                            <textarea placeholder='Description' value="" />
                        </div>
                       
                    </div>
                </form>

                <div className="actionbutton">
                    <button className='cancel' onClick={closeModal}>Cancel</button>
                    <button className='upload'>Upload Event</button>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default EditModal;