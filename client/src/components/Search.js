import React, { useState } from 'react'
import { useNavigate } from 'react-router';


const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) =>{
        e?.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
        }else{
            navigate('/');
        }
    }

    return (
        <div className="search-container">
            <div className="search-box">
                <form
                    onSubmit={submitHandler}
                    className="search-form"
                >
                    <input 
                        type="text" 
                        className="search-input"
                        placeholder="Search here..."
                        onChange={(e) => setKeyword(e?.target?.value)}
                    />
                    <button
                        className="search-btn"
                    >
                        <svg
                            className="search-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            >
                            </path>
                        </svg>
                    </button>
                </form>
            </div>


























            {/* <button
                className="search-btn"
                onClick={() => {
                    setSearchToggle(!searchToggle)
                }}
            >
                <svg
                    className="search-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    >
                    </path>
                </svg>
            </button>
            {
                searchToggle &&
                <div className="search-content">
                    <form
                        onSubmit={submitHandler}
                    >
                        <input 
                            type="text" 
                            placeholder="Search here.."
                            onChange={(e) => setKeyword(e?.target?.value)}
                        />
                        <button type="submit">
                            <svg
                                className="search-icon-in"
                                fill="none" stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                >
                                </path>
                            </svg>
                        </button>
                    </form>
                </div>
            } */}
        </div>
    )
}

export default Search
