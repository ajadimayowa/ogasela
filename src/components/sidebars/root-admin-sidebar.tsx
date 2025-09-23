import React, { useState } from "react";
import "./rootAdminSidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { persistor, RootState } from "../../store/store";
import { toast } from "react-toastify";
import { Image } from "react-bootstrap";
import { SuperAdminNavs } from "../../constants/super-admin/superadminlinks";
import { RootAdminNavs } from "../../constants/super-admin/rootadminlinks";
import { useLocation } from "react-router-dom";

const RootAdminSidebar: React.FC<any> = ({ isOpen, toggleSidbar }) => {
    const [openModule, setOpenModule] = useState<string | null>(null);
    const staffProfile = useSelector((state: RootState) => state.auth.staffProfile);
    const dispatch = useDispatch()
    const getCurrentUrl= useLocation().pathname;

    const handleLogout = async () => {
        // dispatch(logout());
        await persistor.purge();
        localStorage.removeItem('token');
        window.location.replace('/root-login');
    };

    const toggleModule = (name: string) => {
        setOpenModule(prev => (prev === name ? null : name));
    };

    //   const toggleSideBar = (name: string) => {
    //     setOpenModule(prev => (prev === name ? null : name));
    //   };
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleMenu = (id: string) => {
        setOpenMenus((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };


    type SubscriptionLevel = 'basic' | 'standard' | 'pro';

    interface NavItem {
        id: string;
        title: string;
        icon: string;
        path: string;
        subPages?: NavItem[];
    }

    interface Props {
        subscriptionLevel: SubscriptionLevel;
        navs: NavItem[];
    }

    const allowedModules: Record<SubscriptionLevel, string[]> = {
        basic: ['Duplicate Detector'],
        standard: ['Duplicate Detector', 'Accounting'],
        pro: ['Loan Manager', 'Duplicate Detector', 'HR Manager', 'Accounting'],
    };


    const togglSubeMenu = (id: string) => {
        setOpenMenus((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isAllowed = (title: string) =>
        ['Dashboard', 'Settings'].includes(title) ||
        allowedModules['pro'].includes(title);

    return (
        <div className={`sidebar h-100 ${isOpen ? "open" : "collapse"}`}>
            <div className="toggleButton w-100 justify-content-end">
                <i role="button" onClick={toggleSidbar} className="bi p-3 bi-x-circle"></i>
            </div>
            <div className="logo-section w-100 text-center">
                <Image src='https://wok9jamedia.s3.eu-north-1.amazonaws.com/fsh-logo+(1).png' height={38} />
            </div>
            <div className="nav-section h-75 rounded-end-4 w-100 mt-4 py-4 text-start my-2" style={{ overflow: 'auto' }}>
                <ul className="list-unstyled">
                    {RootAdminNavs
                        .map((nav) => (
                            <li className={`p-3 nav-link ${getCurrentUrl.includes(nav.path)?'active':''}`} key={nav.id}>
                                <div
                                    className="d-flex text-light align-items-center justify-content-between"
                                    onClick={() => nav.subPages?.length && toggleMenu(nav.id)}
                                    style={{ cursor: nav.subPages?.length ? 'pointer' : 'default' }}
                                >
                                    <a href={nav.path} className="text-decoration-none text-light ">
                                        <i className={`${nav.icon} me-2 text-light `}></i>
                                        {nav.title}
                                    </a>
                                    {nav.subPages && nav.subPages.length > 0 && (
                                        <i
                                            className={`bi ${openMenus.includes(nav.id) ? 'bi-chevron-up' : 'bi-chevron-down'
                                                }`}
                                        />
                                    )}
                                </div>
                            </li>

                           
                        ))}
                         <li className="text-light p-3">
                            <div onClick={handleLogout} className="d-flex gap-3"  role="button" > 
                                <i className="bi bi-box-arrow-left"></i>
                                Logout
                            </div>
                        </li>
                </ul>
            </div>

            <div className="sidebar-footer">

            </div>


        </div>
    );

}
export default RootAdminSidebar;