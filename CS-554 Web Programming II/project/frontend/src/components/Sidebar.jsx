import React, { useContext } from 'react'
import { AuthContext } from '../firebase/Auth'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
    faMusic,
    faHome,
    faUser,
    faSignInAlt,
    faUserPlus,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

import { useWindowDimensions } from '../functions/dimensions'

import { doSignOut } from '../firebase/FirebaseFunctions'

const SideBar = () => {
    const { width } = useWindowDimensions()
    const location = useLocation()
    const { currentUser } = useContext(AuthContext)
    let body = null

    if (currentUser) {
        body = (
            <div
                className="sidenav shadow"
                style={width <= 1400 ? { width: 55 } : {}}
            >
                <Link
                    to="/"
                    className="menu-row"
                    style={{ fontSize: 26, color: '#fff' }}
                >
                    <Icon icon={faMusic} className="menu-icon" />
                    {width > 1400 && 'SongShare'}
                </Link>
                <Link
                    to="/posts"
                    className="menu-row"
                    aria-label="Posts"
                    style={
                        location.pathname === '/posts' ? { color: '#fff' } : {}
                    }
                >
                    <Icon icon={faHome} className="menu-icon" />
                    {width > 1400 && 'Home'}
                </Link>
                <Link
                    to="/profile"
                    className="menu-row"
                    aria-label="Profile"
                    style={
                        location.pathname === '/profile'
                            ? { color: '#fff', marginLeft: 3 }
                            : { marginLeft: 3 }
                    }
                >
                    <Icon icon={faUser} className="menu-icon" />
                    {width > 1400 && 'Profile'}
                </Link>
                <Link
                    to="/music"
                    className="menu-row"
                    aria-label="music"
                    style={
                        location.pathname === '/music' ? { color: '#fff' } : {}
                    }
                >
                    <Icon icon={faMusic} className="menu-icon" />
                    {width > 1400 && 'Music'}
                </Link>
                <Link
                    to="#"
                    className="menu-row"
                    onClick={doSignOut}
                    aria-label="Sign Out"
                >
                    <Icon icon={faSignOutAlt} className="menu-icon" />
                    {width > 1400 && 'Sign Out'}
                </Link>
            </div>
        )
    } else {
        body = (
            <div
                className="sidenav shadow"
                style={width <= 1400 ? { width: 55 } : {}}
            >
                <div className="header">
                    <Icon icon={faMusic} color="#fff" size="large" />
                    {width > 1400 && <h1 className="header-text">SongShare</h1>}
                </div>

                <Link
                    to="/signin"
                    className="menu-row"
                    aria-label="Sign In"
                    style={
                        location.pathname === '/signin' ? { color: '#fff' } : {}
                    }
                >
                    <Icon icon={faSignInAlt} className="menu-icon" />
                    {width > 1400 && 'Sign In'}
                </Link>
                <Link
                    to="/signup"
                    className="menu-row"
                    aria-label="Sign Up"
                    style={
                        location.pathname === '/signup' ? { color: '#fff' } : {}
                    }
                >
                    <Icon icon={faUserPlus} className="menu-icon" />
                    {width > 1400 && 'Sign Up'}
                </Link>
            </div>
        )
    }

    return <div>{body}</div>
}

export default SideBar
