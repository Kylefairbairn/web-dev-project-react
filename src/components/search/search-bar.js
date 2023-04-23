import React from "react";
import "./search.css"


const Search = (props) => {
    let search = props.search;
    let setSearch = props.setSearch;

    return (
        <>
            <div className="row search-container search">
                <div className="col-11 position-relative">
                    <input
                        placeholder="Search"
                        className="form-control rounded-pill ps-5"
                    />
                    <i
                        className="bi bi-search position-absolute
                            wd-nudge-up"
                    />
                </div>
                <div className="col-1">
                    <i
                        className="wd-bottom-4 text-primary float-end bi
               bi-gear-fill fs-2 position-relative"
                    />
                </div>
            </div>
        </>
    );
};

export default Search;
