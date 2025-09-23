
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from '../css/appcontainer.module.css';
import BottomBar from '../../components/bars/bottombar';
import TopBar from '../../components/bars/topbar';
import SideBar from '../../components/bars/sidebar';


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
const AppContainer:React.FC<any> = ({sdf}) => {
    const [toggleSide,setToggleSide] = useState(false);
    return (
        <div className={`w-100 p-0 m-0`} style={{fontFamily:'hanoble'}}>
            <TopBar offSideBar={()=>setToggleSide(!toggleSide)} type=''/>
            <div className='m-0 p-0'>{<Outlet />}</div>
            <SideBar on={toggleSide} offSideBar={()=>setToggleSide(!toggleSide)}/>
            <BottomBar type='authenticated'/>
            {/* <div className={`${style.bottomNav}`}>
                {
                    guides.map((item)=>
                    (<Link to={item.url}
                        style={{textDecoration:'none'}}
                    ><div style={{display:'flex',flexDirection:'row',marginInline:10}}>{<div>{item.title}</div>}</div></Link>))
                }
            </div> */}
        </div>
    )
}

export default AppContainer;