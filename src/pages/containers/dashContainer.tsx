
import { Link, Outlet } from 'react-router-dom';
import style from '../css/appcontainer.module.css';

const guides = [
    {
        title: 'Home',
        url: '/',
        icon: ''
    },
    {
        title: 'Saved',
        url: 'login',
        icon: ''
    },
    {
        title: 'Sell',
        url: 'signup',
        icon: ''
    }, {
        title: 'Messages',
        url: 'reset-pass',
        icon: ''
    },
    {
        title: 'Profile',
        url: 'otp',
        icon: ''
    }
]
const DashContainer = () => {
    return (
        <div className={`${style.container}`}>
            <div>{<Outlet />}</div>
            <div className={`${style.bottomNav}`}>
                {
                    guides.map((item)=>
                    (<Link to={item.url}
                        style={{textDecoration:'none'}}
                    ><div style={{display:'flex',flexDirection:'row',marginInline:10}}>{<div>{item.title}</div>}</div></Link>))
                }
            </div>
        </div>
    )
}

export default DashContainer;