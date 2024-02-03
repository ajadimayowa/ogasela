import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import style from './sidebar.module.css';

const SideBar: React.FC<any> = ({ type,offSideBar,on }) => {
    const currentPath = useLocation().pathname;
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate()
    
    const sideMenus = [
        {
            title: 'Home',
            icon: 'bi-house-door',
            path: '/surplus'
        },
        {
            title: 'Saved',
            icon: 'bi-basket2',
            path: '/app/dash/products'
        },
        {
            title: 'Sell',
            icon: 'bi-bag-check',
            path: '/app/dash/sales'
        },
        {
            title: 'Messages',
            icon: 'bi-envelope',
            path: '/app/dash/messages'
        },
        {
            title: 'Profile',
            icon: 'bi-person',
            path: '/app/dash'
        },
    ]

    const sideMenusUnAuth = [
        {
            title: 'Home',
            icon: 'bi-house-door',
            path: '/'
        },
        {
            title: 'Support',
            icon: 'bi-basket2',
            path: '/support'
        },
        {
            title: 'About Us',
            icon: 'bi-bag-check',
            path: '/signup'
        }
    ]


    const handleNavigation =(path:string)=>{
       navigate(path);
       offSideBar()
    }
    if (type == 'authenticated') {
        return (
            <div className={on?`${style.sidebar}`:`${style.offSidebar}`}>
                <ul className="d-flex bg-primary w-75" >
                    {
                        sideMenus.map((menu) => (<li>{menu.title}</li>))
                    }
                </ul>

            </div>
        )
    } else {
       return (
            <div className={on?`bg-primary py-5 ${style.sidebar}`:`bg-primary py-5 ${style.offSidebar}`}>
                <div className="w-100 text-end text-light px-5">
                <i className="bi bi-x-circle"
                            style={{ cursor: 'pointer' }}
                            onClick={() => offSideBar()} ></i>
                </div>
                <ul className="d-flex mt-5 text-light  p-0 py-3 m-0 gap-2 flex-column w-100" 
                style={{textDecoration:'none', listStyle:'none', fontFamily:'hanoble'}} >
                    {
                        sideMenusUnAuth.map((menu) => (
                        <li 
                        style={{cursor:'pointer'}}
                        onClick={()=>handleNavigation(menu.path)}
                            className={`text-center py-3 ${currentPath == menu.path ? 'bg-info' : "bg-primary"} p-0 m-0`}>{menu.title}
                        </li>))
                    }
                    <li className="d-flex justify-content-center py-3">
                        <Button 
                        onClick={()=>handleNavigation('/signup')}
                        className="bg-secondary" style={{minWidth:'8em'}}>Get Started</Button>
                        </li>
                    <li className="d-flex justify-content-center py-3">
                        <Button
                        onClick={()=>handleNavigation('/login')} 
                        className="bg-secondary" style={{minWidth:'8em'}}>Login</Button>
                        </li>
                </ul>
                
                

            </div>
        )
    }

}
export default SideBar;