import React from 'react';
import "./editmodal.css";

const EditModal = () => {
    const closeModal = () => {
        const modal = document.querySelector(".editmodal");
        modal.style.display = "none";
    }
    
    return ( 
        <>
        <div className="editmodal">
            <div className="editcont">
                <h1>Edit Event</h1>
                <form action="">
                    <div className="formrow">
                        <div className="grp">
                            <label htmlFor="">Event Name</label>
                            <input type="text" placeholder='Event Name' />
                        </div>
                        <div className="grp">
                            <label htmlFor="">Event Name (AR)</label>
                            <input type="text" placeholder='Event Name' />
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
                            <label htmlFor="">Event Name</label>
                            <input type="text" placeholder='Event Name' />
                        </div>
                        <div className="grp">
                            <label htmlFor="">Event Name</label>
                            <input type="text" placeholder='Event Name' />
                        </div>
                    </div>
                    <div className="formrow">
                        <div className="grp">
                            <label htmlFor="">Event Name</label>
                            <input type="text" placeholder='Event Name' />
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