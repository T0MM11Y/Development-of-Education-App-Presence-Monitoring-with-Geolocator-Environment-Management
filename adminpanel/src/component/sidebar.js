import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const menuItems = [
    { name: 'Dashboard', to: '/dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Absensi', to: '/absensi', icon: 'fas fa-calendar-check' },
    {
        name: 'Siswa',
        to: '/all-siswa',
        icon: 'fas fa-user-graduate',
        subMenuItems: [
            { name: 'All Siswa', to: '/all-siswa' },
            { name: 'Add Siswa', to: '/add-siswa' },
        ],
    },

    {
        name: 'Pengajar',
        to: '/all-pengajar',
        icon: 'fas fa-chalkboard-teacher',
        subMenuItems: [
            { name: 'All Pengajar', to: '/all-pengajar' },
            { name: 'Add Pengajar', to: '/add-pengajar' },
        ],
    },
    {
        name: 'Kelas',
        to: '/all-kelas',
        icon: 'fas fa-school',
        subMenuItems: [{ name: 'All Kelas', to: '/all-kelas' }],
    },
    {
        name: 'Roster',
        to: '/all-roster',
        icon: 'fas fa-calendar-alt',
        subMenuItems: [{ name: 'All Roster', to: '/all-roster' }],
    },
    {
        name: 'Pengumuman',
        to: '/all-pengumuman',
        icon: 'fas fa-bullhorn',
        subMenuItems: [
            { name: 'All Pengumuman', to: '/all-pengumuman' },
            { name: 'Add Pengumuman', to: '/add-pengumuman' },
        ],
    },
    { name: 'Tanya Jawab', to: '/tanya-jawab', icon: 'fas fa-question-circle' },


];

function Sidebar() {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const currentPath = location.pathname.split('/')[1];
        const activeMenuItem = menuItems.find(item => item.to.substr(1) === currentPath || item.subMenuItems?.some(subItem => subItem.to.split('/')[1] === currentPath));
        setActiveMenu(activeMenuItem?.to.substr(1));
    }, [location]);

    const toggleDropdown = (name) => {
        setActiveMenu(activeMenu === name ? null : name);
    };
    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                <div className="user-profile text-center mt-5">
                    <div className="">
                        <img src="../robotprofilewhite.jpg" alt="" width={90} />
                    </div>
                    <div className="mt-3">
                        <h4 className="font-size-16 mb-1">Admin</h4>
                        <span className="text-muted">
                            <i className="ri-record-circle-line align-middle font-size-14 text-success"></i> Online
                        </span>
                    </div>
                </div>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>
                        {menuItems.map((menuItem, index) => (
                            <MenuItem key={index} menuItem={menuItem} activeMenu={activeMenu} toggleDropdown={toggleDropdown} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
const MenuItem = ({ menuItem, activeMenu, toggleDropdown }) => {
    const { name, to, icon, subMenuItems } = menuItem;
    const location = useLocation();
    const isActive = location.pathname.startsWith(to) || subMenuItems?.some(subItem => location.pathname.startsWith(subItem.to));

    return (
        <li className={isActive ? "mm-active" : ""}>
            {subMenuItems ? (
                <a href="javascript:void(0);" className={`has-arrow waves-effect ${isActive ? 'active' : ''}`} onClick={() => toggleDropdown(to.substr(1))}>
                    <i className={icon} style={{ marginRight: '5px' }}></i>
                    <span>{name}</span>
                </a>
            ) : (
                <NavLink to={to} activeClassName="active">
                    <i className={icon}></i>
                    <span>{name}</span>
                </NavLink>
            )}

            {activeMenu === to.substr(1) && subMenuItems && (
                <ul className={`sub-menu ${activeMenu === to.substr(1) ? 'open' : ''}`} aria-expanded="false">
                    {subMenuItems.map((subMenuItem, index) => (
                        <li key={index}>
                            <NavLink to={subMenuItem.to} activeClassName="active">
                                {subMenuItem.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Sidebar;
