import { useCurrentUser } from '@helpers/hooks'
import { storeUser } from '@helpers/methods/store-user'
import Typography from '../../Component-Library/Typography/typography'
import { Link, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import './header.css'

function LoggedInHeader() {
    const { user } = useCurrentUser()
    useEffect(() => user && storeUser(user.addr), [user]);

    const history = useHistory()

    const gotoMarketplace = () => {
        const path = `/marketplace`
        history.push(path)
    }

    const gotoStats = () => {
        const path = `/stats`
        history.push(path)
    }

    return (
        <div className="Header">
            <div className="Logo">
                <Typography variant="Title-28" text="Nfinita" />
            </div>
            <div className="Heading-Bar-LoggedIn">
                <button className="Header-Buttons" type="button" onClick={gotoMarketplace}>
                    <Typography variant="Text-16" text="Marketplace" />
                </button>
                <button className="Header-Buttons" type="button" onClick={gotoStats}>
                    <Typography variant="Text-16" text="Stats" />
                </button>
                <Link className="icon-Button" type="button" mr="4" to={`/user/${user.addr}`} display="flex" flexdirection="row">
                    <img className="Flow-Icon" src='https://cryptologos.cc/logos/flow-flow-logo.png?v=013' alt="" />
                    <Typography variant="Text-16" text="My Wallet" color="black" />
                </Link>
            </div>
        </div>
    )
}

export default LoggedInHeader
