import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomBar: React.FC<any> = ({ type }) => {
    const currentPath = useLocation().pathname;
    const token = localStorage.getItem('userToken');
    const location = useLocation();
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const menus = [
        {
            title: 'Home',
            icon: 'bi-house-door',
            path: '/'
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

    const handleLoginCheck = (pathUrl:string) => {
        console.log('Here')
        if (token) {
            navigate(pathUrl)

        } else {
            navigate(pathUrl)
        }
    }


    if (type == 'authenticated') {
        return (
            <nav className="navbar sticky-bottom px-3 navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid ">
                {
                menus.map((menu, index) => (
                    <div
                        key={index}
                        onClick={() => handleLoginCheck(menu.path)}
                        className="d-flex flex-column text-primary justify-content-center  align-items-center"
                        style={{ cursor: 'pointer' }}>
                        <i className={`bi ${menu.icon}${currentPath == menu.path ? '-fill' : ''} p-0 m-0`} style={{ fontFamily: 'tFontMd', fontSize: '1.4em' }}></i>
                        <p className="m-0 p-0" style={{ }}>{menu.title}</p>
                    </div>
                ))
            }
                </div>
            </nav>
        )
    } else if (type == 'authenticated') {
        return (
            <nav className="navbar navbar-expand-lg  navbar-light bg-light">
                <div className="container-fluid ">
                {
                menus.map((menu, index) => (
                    <div
                        key={index}
                        // onClick={() => handleLoginCheck(menu.path)}
                        className="d-flex  flex-column text-primary justify-content-center  align-items-center"
                        style={{ fontFamily: 'tFontMd', fontSize: '0.9em', cursor: 'pointer' }}>
                        <i className={`bi ${menu.icon}${currentPath == menu.path ? '-fill' : ''} p-0 m-0`} style={{ fontFamily: 'tFontMd', fontSize: '1.4em' }}></i>
                        <p className="m-0 p-0" style={{ fontFamily: 'tFon', fontSize: '0.7em' }}>{menu.title}</p>
                    </div>
                ))
            }
                </div>
            </nav>
        )
    }

    else {
        return (<p>{''}</p>)
    }

}
export default BottomBar;