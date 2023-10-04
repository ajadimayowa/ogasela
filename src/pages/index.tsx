import React from "react";
import style from '../pages/css/homepage.module.css';
import logo from '../assets/images/logo.svg';

const Homepage = () => {
    return (
        <div className={`${style.container}`}>
            <div className={`${style.main}`}>
            <img className={`${style.appLogo}`} src={logo} height={'50em'} style={{marginTop:'2em'}}/>
            <h1 style={{fontSize:'2.5em',color:'#254D73'}}>Coming Soon</h1>
            </div>

            <div className={`${style.main}`}>
            <img className={`${style.appLogo}`} src={logo} height={'50em'} style={{marginTop:'2em'}}/>
            <h1 style={{fontSize:'2.5em',color:'#254D73'}}>Coming Soon</h1>
            </div>


            <div className={`${style.main}`}>
            <img className={`${style.appLogo}`} src={logo} height={'50em'} style={{marginTop:'2em'}}/>
            <h1 style={{fontSize:'2.5em',color:'#254D73'}}>Coming Soon</h1>
            </div>

            <div className={`${style.main}`}>
            <img className={`${style.appLogo}`} src={logo} height={'50em'} style={{marginTop:'2em'}}/>
            <h1 style={{fontSize:'2.5em',color:'#254D73'}}>Coming Soon</h1>
            </div>

            <div className={`${style.main}`}>
            <img className={`${style.appLogo}`} src={logo} height={'50em'} style={{marginTop:'2em'}}/>
            <h1 style={{fontSize:'2.5em',color:'#254D73'}}>Coming Soon</h1>
            </div>
        </div>
    )

}

export default Homepage;