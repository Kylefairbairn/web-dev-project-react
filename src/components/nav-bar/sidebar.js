import React from "react";
import "./sidebar.css";
import {useLocation, Link} from "react-router-dom";

function Navigation() {
    const {pathname} = useLocation();

    const links = [
        // {label: 'Welcome', icon: 'bi-controller', path: ''},
        {label: 'Home', icon: 'bi-house-door-fill', path: '/trivia/home'},
        {label: 'Challenge', icon: 'bi-currency-dollar', path: '/trivia/challenge'},
        {label: 'Create A Game', icon: 'bi-play-fill', path: 'trivia/create'},
        // {label: 'Create A Question', icon: 'bi-play-fill', path: 'trivia/customize'},
        {label: 'Checkout Category', icon: 'bi-bookmark', path: 'trivia/category'},
        // {label: 'Saved Questions', icon: 'bi-bookmark', path: 'trivia/liked'},
        {label: 'Profile', icon: 'bi-person-fill', path: 'profile'},
        {label: 'Sign Up', icon: 'bi-person-fill', path: 'signup'},
        {label: 'Login', icon: 'bi-person-fill', path: 'login'},
    ];
    return (
        <div className="ttr-navigation ">
            <div className="list-group">
                {
                    links.map((link, ndx) => {
                        return (
                            <Link
                                to={link.path} id={link.label}
                                key={ndx}
                                className={`list-group-item  text-nowrap
                          ${pathname.indexOf(link.path) >= 0 ? 'active' : ''}`}>
                                <i className={`bi ${link.icon} sidebar-icon p-2 bg-light`}/>
                                <span className="sidebar-label">{link.label}</span>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Navigation;