import React, { useState } from 'react';
import "./editmodal.css";
import { supabase } from "../supabase";

const AddModal = (props) => {
    const [nameEn, setNameEn] = useState("");
    const [nameAr, setNameAr] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [descriptionAr, setDescriptionAr] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [price, setPrice] = useState("");
    const [locationEn, setLocationEn] = useState("");
    const [locationAr, setLocationAr] = useState("");
    const [venueEn, setVenueEn] = useState("");
    const [venueAr, setVenueAr] = useState("");
    const [capacity, setCapacity] = useState("");
    const [availableTickets, setAvailableTickets] = useState("");
    const [status, setStatus] = useState("upcoming");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const closeModal = () => {
        const modal = document.querySelector(".addmodal");
        modal.style.display = "none";
    }

    const validate = () => {
        const newErrors = {};
        if (!nameEn) newErrors.nameEn = "Name (EN) is required";
        if (!nameAr) newErrors.nameAr = "Name (AR) is required";
        if (!descriptionEn) newErrors.descriptionEn = "Description (EN) is required";
        if (!descriptionAr) newErrors.descriptionAr = "Description (AR) is required";
        if (!image) newErrors.image = "Image is required";

        if (props.type === "event") {
            if (!date) newErrors.date = "Date is required";
            if (!time) newErrors.time = "Time is required";
            if (!price) newErrors.price = "Price is required";
            if (!locationEn) newErrors.locationEn = "Location (EN) is required";
            if (!locationAr) newErrors.locationAr = "Location (AR) is required";
            if (!venueEn) newErrors.venueEn = "Venue (EN) is required";
            if (!venueAr) newErrors.venueAr = "Venue (AR) is required";
            if (!capacity) newErrors.capacity = "Capacity is required";
            if (!availableTickets) newErrors.availableTickets = "Available Tickets is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const resetForm = () => {
        setNameEn(""); setNameAr("");
        setDescriptionEn(""); setDescriptionAr("");
        setDate(""); setTime("");
        setPrice("");
        setLocationEn(""); setLocationAr("");
        setVenueEn(""); setVenueAr("");
        setCapacity(""); setAvailableTickets("");
        setStatus("upcoming");
        setImage(null);
        setErrors({});
    }

    const handleSubmit = async () => {
        const isValid = validate();
        if (!isValid) return;

        if (props.type === "event") {
            const fileExt = image.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("event_imgs")
                .upload(`event_imgs/${fileName}`, image);

            if (uploadError) { console.error("Upload error:", uploadError); return; }

            const { data: urlData } = supabase.storage.from("event_imgs").getPublicUrl(`event_imgs/${fileName}`);

            const { data, error } = await supabase.from("events").insert({
                title_en: nameEn,
                title_ar: nameAr,
                description_en: descriptionEn,
                description_ar: descriptionAr,
                date: date,
                time: time,
                price: price,
                location_en: locationEn,
                location_ar: locationAr,
                venue_en: venueEn,
                venue_ar: venueAr,
                capacity: capacity,
                available_tickets: availableTickets,
                status: status,
                image_url: urlData.publicUrl,
            }).select().single();

            if (error) { console.error("Insert error:", error); return; }

            if (props.onEventAdded) props.onEventAdded(data);

       } else if (props.type === "category") {
        const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
        .from("category_imgs")
        .upload(`category_imgs/${fileName}`, image);

    if (uploadError) { console.error("Upload error:", uploadError); return; }

    const { data: urlData } = supabase.storage.from("category_imgs").getPublicUrl(`category_imgs/${fileName}`);

    const { data, error } = await supabase.from("categories").insert({
        title_en: nameEn,
        title_ar: nameAr,
        description_en: descriptionEn,
        description_ar: descriptionAr,
        image_url: urlData.publicUrl,
    }).select().single();

    if (error) { console.error("Insert error:", error); return; }

    if (props.onEventAdded) props.onEventAdded(data);
    }

        resetForm();
        closeModal();
    }

    return (
        <>
        <div className="addmodal">
            <div className="editcont">
                <h1>Add {props.modalname}</h1>
                <form>
                    <div className="formrow">
                        <div className="grp">
                            <label>{props.modalname} Name</label>
                            <input type="text" placeholder={`${props.modalname} Name`}
                                value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
                            {errors.nameEn && <span className="error">{errors.nameEn}</span>}
                        </div>
                        <div className="grp">
                            <label>{props.modalname} Name (AR)</label>
                            <input type="text" placeholder={`${props.modalname} Name AR`}
                                value={nameAr} onChange={(e) => setNameAr(e.target.value)} />
                            {errors.nameAr && <span className="error">{errors.nameAr}</span>}
                        </div>
                    </div>

                    {props.type === "category" && (
                        <>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Description</label>
                                    <textarea placeholder='Description (EN)'
                                        value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />
                                    {errors.descriptionEn && <span className="error">{errors.descriptionEn}</span>}
                                </div>
                                <div className="grp">
                                    <label>Description (AR)</label>
                                    <textarea placeholder='Description (AR)'
                                        value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} />
                                    {errors.descriptionAr && <span className="error">{errors.descriptionAr}</span>}
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Image</label>
                                    <input type="file" accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])} />
                                    {errors.image && <span className="error">{errors.image}</span>}
                                </div>
                            </div>
                        </>
                    )}

                    {props.type === "event" && (
                        <>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Date</label>
                                    <input type="date"
                                        value={date} onChange={(e) => setDate(e.target.value)} />
                                    {errors.date && <span className="error">{errors.date}</span>}
                                </div>
                                <div className="grp">
                                    <label>Time</label>
                                    <input type="time"
                                        value={time} onChange={(e) => setTime(e.target.value)} />
                                    {errors.time && <span className="error">{errors.time}</span>}
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Price ($)</label>
                                    <input type="number" placeholder='0.00$'
                                        value={price} onChange={(e) => setPrice(e.target.value)} />
                                    {errors.price && <span className="error">{errors.price}</span>}
                                </div>
                                <div className="grp">
                                    <label>Status</label>
                                    <div className="select-wrapper">
                                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="postponed">Postponed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Description (EN)</label>
                                    <textarea placeholder='Description'
                                        value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />
                                    {errors.descriptionEn && <span className="error">{errors.descriptionEn}</span>}
                                </div>
                                <div className="grp">
                                    <label>Description (AR)</label>
                                    <textarea placeholder='Description (AR)'
                                        value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} />
                                    {errors.descriptionAr && <span className="error">{errors.descriptionAr}</span>}
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Location (EN)</label>
                                    <input type="text" placeholder='Location EN'
                                        value={locationEn} onChange={(e) => setLocationEn(e.target.value)} />
                                    {errors.locationEn && <span className="error">{errors.locationEn}</span>}
                                </div>
                                <div className="grp">
                                    <label>Location (AR)</label>
                                    <input type="text" placeholder='Location AR'
                                        value={locationAr} onChange={(e) => setLocationAr(e.target.value)} />
                                    {errors.locationAr && <span className="error">{errors.locationAr}</span>}
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Venue (EN)</label>
                                    <input type="text" placeholder='Venue EN'
                                        value={venueEn} onChange={(e) => setVenueEn(e.target.value)} />
                                    {errors.venueEn && <span className="error">{errors.venueEn}</span>}
                                </div>
                                <div className="grp">
                                    <label>Venue (AR)</label>
                                    <input type="text" placeholder='Venue AR'
                                        value={venueAr} onChange={(e) => setVenueAr(e.target.value)} />
                                    {errors.venueAr && <span className="error">{errors.venueAr}</span>}
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Capacity</label>
                                    <input type="number" placeholder='Capacity'
                                        value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                                    {errors.capacity && <span className="error">{errors.capacity}</span>}
                                </div>
                                <div className="grp">
                                    <label>Available Tickets</label>
                                    <input type="number" placeholder='Available Tickets'
                                        value={availableTickets} onChange={(e) => setAvailableTickets(e.target.value)} />
                                    {errors.availableTickets && <span className="error">{errors.availableTickets}</span>}
                                </div>
                            </div>
                            <div className="formrow">
                                <div className="grp">
                                    <label>Image</label>
                                    <input type="file" accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])} />
                                    {errors.image && <span className="error">{errors.image}</span>}
                                </div>
                            </div>
                        </>
                    )}
                </form>

                <div className="actionbutton">
                    <button className='cancel' onClick={closeModal}>Cancel</button>
                    <button className='upload' onClick={handleSubmit}>Add {props.modalname}</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default AddModal;