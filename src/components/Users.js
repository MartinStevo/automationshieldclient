import '../App.css';
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from "react";

function Users() {

    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [user, setUser] = useState(false);
    const [loggedUsername, setLoggedUsernameWelcome] = useState("");
    const [loggedRole, setLoggedRole] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    function setData(data) {
        setLoggedUsernameWelcome(data.name);
        setLoggedRole(data.role);
        setUser(true);
        //setFormStyle({visibility: "hidden"});
    }

    function checkState() {
        fetch("http://localhost:9000/getuser/state", {
            method: "get",
            dataType: 'json',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.exist === 0) {
                    setData(data);
                }
            })
    }

    useEffect(() => {
        checkState();
    }, [])

    function register(event) {
        event.preventDefault();

        if (password1 === password2) {
            fetch("http://localhost:9000/getuser/register", {
                method: "post",
                headers: {
                    'Content-type': "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({name: email, password: password1})
            })
                .then((res) => res.json())
                .then((data) => {
                    clearData();
                    if (data.exist === 0) {
                        setData(data);
                    } else {
                        setErrorMessage("Username already exists");
                    }
                })
        } else {
            alert('Passwords don\'t match');
            clearData();
        }
    }

    function login(event) {
        event.preventDefault();

        fetch("http://localhost:9000/getuser/login", {
            method: "post",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({name: username, password: password})
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.exist === 0) {
                    setData(data);
                } else {
                    setErrorMessage("Wrong username or password")
                }
                clearData();
            })
    }

    function logout(event) {
        event.preventDefault();

        fetch("http://localhost:9000/getuser/logout", {
            method: "get",
            dataType: 'json',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.exist === 0) {
                    setUser(false);
                    setLoggedUsernameWelcome("");
                } else {
                    setErrorMessage("Error")
                }
            })
    }

    if (user === true) {
        //setFormStyle({visibility: "hidden"});
        return (
            <div className={"users"}>
                <div className="section-left">
                    <div>
                        <h3>{loggedUsername}</h3>
                        {loggedUsername} u can move to your dashboard
                    </div>
                    <br/>
                    <form onSubmit={logout}>
                        <input type="submit" value="Logout"/><br/>
                        <input style={{visibility: "hidden"}} type="text" value={1}/>
                        <br/>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="users">
            <div className="section-left">
                {/*<h3>Register</h3>*/}
                <div className="us">
                    <form onSubmit={register}>
                        <label>
                            Username:<br/>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </label><br/>
                        <label>
                            Password:<br/>
                            <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}
                                   required/>
                        </label><br/>
                        <label>
                            Verify Password:<br/>
                            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}
                                   required/>
                        </label><br/><br/>
                        <input className="btn" type="submit" value="Register"/><br/>
                    </form>
                </div>
                {/*<h3>Log in</h3>*/}
                <br/><br/>
                <div className="us">
                    <form onSubmit={login}>
                        <label>
                            Username:<br/>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </label><br/>
                        <label>
                            Password:<br/>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                   required/>
                        </label><br/><br/>
                        <input className="btn" type="submit" value="Login"/><br/>
                        <p>{errorMessage}</p>
                        {/*<br/>*/}
                    </form>
                </div>
            </div>
            {/*<div className="section-right">*/}
            {/*</div>*/}
        </div>

    );

    function clearData() {
        setErrorMessage("");
        setEmail("");
        setPassword1("");
        setPassword2("");
        setUsername("");
        setPassword("");

    }
}

export default Users;
