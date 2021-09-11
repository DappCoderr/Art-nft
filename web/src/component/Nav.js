import React from 'react'
import { useHistory } from "react-router-dom"

import { NAV_ROUTES } from './NavRoutes.js'
import "./Nav.css"

export default function Nav() {

    const history = useHistory()

    const NavItem = ({route}) => {
        <div className="navbar__item">
            <div className="btn" onClick={() => history.push(route.path)}>
                {route.name}
            </div>
        </div>
    }

    return (
        <>
            <div className="navbar">
                {NAV_ROUTES.map(item => <NavItem route={item} key={item.path} />)}
            </div>
        </>
    )
}
