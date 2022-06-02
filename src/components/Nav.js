import logo from '../logo.svg';
import '../App.css';
import {Link} from 'react-router-dom'

function Nav() {

    const navStyle = {
        color: "white",
        textDecoration: 'none'
    }

    const ulStyle = {
        textAlign: "left"
    }


    return (
        <nav>
            <img src={logo} className="App-logo" alt="logo"/>
            <div style={ulStyle}>
                <ul className={"nav-Links"}>
                    <Link style={navStyle} to='/dashboard'>
                        <li>Dashboard</li>
                    </Link>
                    <br/>
                    <Link style={navStyle} to='/users'>
                        <li>Profile</li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
