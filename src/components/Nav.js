import logo from '../logo.svg';
import '../App.css';
import {Link} from 'react-router-dom'

function Nav() {

    const navStyle = {
        color: "white",
        textDecoration: 'none'
    }

    return (
        <nav>
            <img src={logo} className="App-logo" alt="logo"/>
            <ul className={"nav-Links"}>
                <Link style={navStyle}  to='/dashboard'>
                    <li>Dashboard</li>
                </Link>
                <Link style={navStyle}  to='/users'>
                    <li>Profile</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
