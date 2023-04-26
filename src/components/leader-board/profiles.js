import React from 'react'
import {Link} from "react-router-dom";

export default function profiles({ Leaderboard }) {
    return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
    )
}

function Item(data) {
    return (

        <>
            {
                data.map((value, index) => (
                        <div className="flex" key={index}>
                            <div className="item">
                                <Link to={`profile/${value._id}`}>
                                <img src={value.img} alt=""/>
                                </Link>
                                <div className="info">
                                    {/*<h4 className='name text-dark'>{value.name}</h4>*/}
                                    {/*<span>{value.location}</span>*/}

                                    <span>
                                         <h4 className='name text-dark'>{value.name}</h4>

                                    </span>
                                </div>
                            </div>
                            <div className="item-score">
                                {value.score}
                            </div>
                        </div>
                    )
                )
            }
        </>


    )
}