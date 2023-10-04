
import { Link, Outlet } from 'react-router-dom';
import style from '../css/appcontainer.module.css';

const guides = [
    {
        title: 'Home',
        url: '/',
        icon: ''
    },
    {
        title: 'Login',
        url: 'login',
        icon: ''
    },
    {
        title: 'Sign up',
        url: 'signup',
        icon: ''
    }, {
        title: 'Reset',
        url: 'reset-pass',
        icon: ''
    },
    {
        title: 'Otp',
        url: 'otp',
        icon: ''
    }
]
const AppContainer = () => {
    return (
        <div className={`${style.container}`}>
            <div>{<Outlet />}</div>
            <div className={`${style.bottomNav}`}>
                {
                    guides.map((item)=>
                    (<Link to={item.url}><div style={{display:'flex',flexDirection:'row',marginInline:10}}>{<div>{item.title}</div>}</div></Link>))
                }
            </div>
        </div>
    )
}

export default AppContainer;