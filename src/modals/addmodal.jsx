import React from 'react';
import "./editmodal.css";

const AddModal = (props) => {
    const closeModal = () => {
        const modal = document.querySelector(".addmodal");
        modal.style.display = "none";
    }
    const createEvent = (()=>{
        console.log(111)
    })
   


    return ( 
        <>
        <div className="addmodal">
            <div className="editcont">
                <h1>Add {props.modalname}</h1>
                <form action="" onSubmit={createEvent}>
                    <div className="formrow">
                        <div className="grp">
                            <label htmlFor="">{props.modalname} Name</label>
                            <input type="text" placeholder={`${props.modalname} Name`} required/>
                        </div>
                        <div className="grp">
                            <label htmlFor="">{props.modalname} Name (AR)</label>
                            <input type="text" placeholder={`${props.modalname} Name AR`} required/>
                        </div>
                    </div>

                    {props.type === "category" && (
                        <>
                            <div className="formrow">
                                <div className="grp">
                                    <label htmlFor="">Description</label>
                                    <textarea placeholder='Description (EN)' defaultValue={props.data?.description_en} required/>
                                </div>
                                <div className="grp">
                                    <label htmlFor="">Description (AR)</label>
                                    <textarea placeholder='Description (AR)' defaultValue={props.data?.description_ar} required/>
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
                                    <label htmlFor="">Date & Time</label>
                                    <input type="datetime-local" required />
                                </div>
                                <div className="grp">
                                    <label htmlFor="">Price ($)</label>
                                    <input type="number" placeholder='0.00$'  required/>
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label htmlFor="">Description</label>
                                    <textarea placeholder='Description' required/>
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label htmlFor="">Image</label>
                                    <input type="file" accept="image/*" required/>
                                </div>
                            </div>
                        </>
                    )}
                </form>

                <div className="actionbutton">
                    <button className='cancel' onClick={closeModal}>Cancel</button>
                    <button className='upload'>Add {props.modalname}</button>
                </div>
            </div>
        </div>
        </>
     );
}
export default AddModal;