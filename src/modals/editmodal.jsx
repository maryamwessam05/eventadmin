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
                            <input type="text" placeholder={`${props.modalname} Name`} defaultValue={props.data?.name_en} />
                        </div>
                        <div className="grp">
                            <label htmlFor="">{props.modalname} Name (AR)</label>
                            <input type="text" placeholder={`${props.modalname} Name AR`} defaultValue={props.data?.name_ar} />
                        </div>
                    </div>

                    {props.type === "category" && (
                        <>
                            <div className="formrow">
                                <div className="grp">
                                    <label htmlFor="">Description</label>
                                    <textarea placeholder='Description (EN)' defaultValue={props.data?.description_en} />
                                </div>
                                <div className="grp">
                                    <label htmlFor="">Description (AR)</label>
                                    <textarea placeholder='Description (AR)' defaultValue={props.data?.description_ar} />
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label htmlFor="">Image</label>
                                    <input type="file" accept="image/*" />
                                </div>
                            </div>
                        </>
                    )}

                    {props.type === "event" && (
                        <>
                            <div className="formrow">
                                <div className="grp">
                                    <label htmlFor="">Category</label>
                                    <div className="select-wrapper">
                                        <select defaultValue={props.data?.category}>
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
                                    <label htmlFor="">Date & Time</label>
                                    <input type="datetime-local" defaultValue={props.data?.datetime} />
                                </div>
                                <div className="grp">
                                    <label htmlFor="">Price ($)</label>
                                    <input type="number" placeholder='0.00$' defaultValue={props.data?.price} />
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label htmlFor="">Description</label>
                                    <textarea placeholder='Description' defaultValue={props.data?.description} />
                                </div>
                            </div>
                        </>
                    )}
                </form>

                <div className="actionbutton">
                    <button className='cancel' onClick={closeModal}>Cancel</button>
                    <button className='upload'>Save {props.modalname}</button>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default EditModal;