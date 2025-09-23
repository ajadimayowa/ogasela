import React from "react";
import style from '../css/homepage.module.css';

const DashboardPage = () => {
    return (
        <div className={`${style.container}`}>
            <div className={`${style.main}`}>
            <h1>Dashboard</h1>
            <h1 style={{fontSize:'2.5em',color:'#254D73'}}>Coming Soon</h1>
            </div>
        </div>
    )

}

export default DashboardPage;