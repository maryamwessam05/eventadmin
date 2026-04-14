import React from 'react';
import searchIcon from "../assets/search.svg";

const SearchBar = ({ placeholder = "Search...", value, onChange }) => {
    return (
        <div className="searchbar">
            <img src={searchIcon} alt="" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;