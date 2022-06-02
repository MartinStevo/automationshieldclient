import '../App.css';
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import bcrypt from 'bcryptjs';

function Users() {

    const [email, setEmail] = useState();
    const [newUsername, setNewUsername] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loggedUsername, setLoggedUsernameWelcome] = useState("");
    const [admin, setAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [users, setUsers] = useState([]);
    const [reset, setReset] = useState(0);

    function setData(data) {
        setLoggedUsernameWelcome(data.name);
        setAdmin(data.admin);
        if (data.admin) {
            setUsers(data.users);
        }
        setUserLoggedIn(true);
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

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    function register(event) {
        event.preventDefault();

        if (password1 === password2) {
            if (password1.toString().length > 7 && hasNumber(password1.toString())) {
                //const salt = bcrypt.genSaltSync(10); // create salt
                const hashedPassword = bcrypt.hashSync(password1, '$2a$10$CwTycUXWue0Thq9StjUM0u');
                //console.log(salt);
                fetch("http://localhost:9000/getuser/register", {
                    method: "post",
                    headers: {
                        'Content-type': "application/json",
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({email: email, username: newUsername, password: hashedPassword})
                })
                    .then((res) => res.json())
                    .then((data) => {
                        clearData();
                        if (data.exist === 0) {
                            setData(data);
                        } else {
                            if (data.exist === 1) {
                                setErrorMessage("Username already exists");
                            }

                        }
                    })
            } else {
                alert('The password must be at least 8 characters long and contain a number');
                clearData();
            }
        } else {
            alert('Passwords don\'t match');
            clearData();
        }
    }

    function login(event) {
        event.preventDefault();
        const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
        fetch("http://localhost:9000/getuser/login", {
            method: "post",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({name: username, password: hashedPassword})
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
                    setUserLoggedIn(false);
                    setLoggedUsernameWelcome("");
                } else {
                    setErrorMessage("Error")
                }
            })
    }

    const forgottenPassword = () => {
        setReset(1);
    };

    function cancel() {
        clearData();
        setReset(0);
    }

    function resetPassword(event) {
        event.preventDefault();

        if (password1 === password2) {
            if (password1.toString().length > 7 && hasNumber(password1.toString())) {
                //const salt = bcrypt.genSaltSync(10); // create salt
                const hashedPassword = bcrypt.hashSync(password1, '$2a$10$CwTycUXWue0Thq9StjUM0u');
                //console.log(salt);
                fetch("http://localhost:9000/getuser/resetpassword", {
                    method: "post",
                    headers: {
                        'Content-type': "application/json",
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({email: email, username: newUsername, password: hashedPassword})
                })
                    .then((res) => res.json())
                    .then((data) => {
                        clearData();
                        if (data.exist === 0) {
                            alert("Password has been changed successfully")
                            setReset(0);
                        } else {
                            if (data.exist === 1) {
                                setErrorMessage("The specified e-mail does not belong to the specified username");
                            }

                        }
                    })
            } else {
                alert('The password must be at least 8 characters long and contain a number');
                clearData();
            }
        } else {
            alert('Passwords don\'t match');
            clearData();
        }
    }

    function removeUser(event) {
        event.preventDefault();

        fetch("http://localhost:9000/getuser/remove", {
            method: "delete",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({name: event.target.userSelect.value})
        })
            .then((res) => res.json())
            .then((data) => {
                checkState();
            })
    }

    if (userLoggedIn === true && admin) {
        return (
            <article>
                <div className="users" id="admin-left">
                    <div>
                        <h3>{loggedUsername}</h3>
                        {loggedUsername} u can move to your <Link style={{color: "black"}}
                                                                  to='/dashboard'>dashboard</Link>
                    </div>
                    <br/>
                    <form onSubmit={logout}>
                        <input type="submit" value="Logout"/><br/>
                        <input style={{visibility: "hidden"}} type="text" value={1}/>
                        <br/>
                    </form>
                </div>
                <div className="admin-right">
                    {/*<h4>Users:</h4>*/}
                    <form onSubmit={removeUser}>
                        <label>
                            Users:<br/>
                            <select className="qwide" name="userSelect" id="userSelect">
                                {users.map(value =>
                                    <option value={value}>{value}</option>
                                )}
                            </select><br/>
                        </label><br/>
                        <input style={{marginLeft: "10px"}} type="submit" value="Remove user"/><br/>
                    </form>
                </div>
            </article>
        )
    }

    if (userLoggedIn === true && !admin) {
        return (
            <article>
                <div className="users">
                    <div>
                        <h3>{loggedUsername}</h3>
                        {loggedUsername} u can move to your <Link style={{color: "black"}}
                                                                  to='/dashboard'>dashboard</Link>
                    </div>
                    <br/>
                    <form onSubmit={logout}>
                        <input type="submit" value="Logout"/><br/>
                        <input style={{visibility: "hidden"}} type="text" value={1}/>
                        <br/>
                    </form>
                </div>
            </article>
        )
    }

    if (reset === 1) {
        return (
            <article>
                <div className="users">
                    <form onSubmit={resetPassword}>
                        <label>
                            Username:<br/>
                            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                                   required/>
                        </label><br/>
                        <label>
                            New Password:<br/>
                            <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}
                                   required/>
                        </label><br/>
                        <label>
                            Verify New Password:<br/>
                            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}
                                   required/>
                        </label><br/>
                        <label>
                            Email address:<br/>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </label><br/><br/>
                        <input className="btn" type="submit" value="Save new password"/><br/>
                    </form>

                    <div><br/><br/>
                        <button className="editInput" type="button" onClick={cancel}>Cancel
                        </button>
                    </div><br/>
                    <p>{errorMessage}</p>
                </div>
            </article>
        )
    } else {
        return (
            <article>
                <div className="users">
                    <form onSubmit={register}>
                        <label>
                            Email address:<br/>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </label><br/>
                        <label>
                            Username:<br/>
                            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                                   required/>
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

                    <br/><br/>
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
                        <input className="btn" type="submit" value="Log in"/><br/>
                        <p>{errorMessage}</p>
                        {/*<br/>*/}
                    </form>
                    <br/>
                    <p className="btn-hov" onClick={forgottenPassword}>Forgotten password?</p>
                </div>
            </article>
        );
    }

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
