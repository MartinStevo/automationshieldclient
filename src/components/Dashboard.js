import '../App.css';
import {Link, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import Logs from "./FloatShield/Logs";
import Predictions from "./FloatShield/Predictions";
import MotoLogs from "./MotoShield/MotoLogs";
import MotoPredictions from "./MotoShield/MotoPredictions";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(0);
    const [newLab, setNewLab] = useState(0);
    const [labEdit, setLabEdit] = useState(0);
    const [newValue, setNewValue] = useState();
    const [labToEdit, setLabToEdit] = useState({});
    const [exists, setExists] = useState("");

    const [data, setData] = useState([]);

    const [labUsersList, setLabUsersList] = useState([]);
    const [labUser, setLabUser] = useState("");

    function checkStateLoadLabs() {
        fetch("http://localhost:9000/getuser/loadlabs", {
            method: "get",
            dataType: 'json',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.exist === 0) {
                    setData(data);
                    setUser(1);
                }
            })
    }

    useEffect(() => {
        checkStateLoadLabs();
    }, [])

    function toLogin() {
        navigate("/users");
    }

    function createLab() {
        setNewLab(1);
    }

    function postDatalab(event) {
        event.preventDefault();

        labUsersList.push(data.name);

        var datalab = {
            device: event.target.device.value,
            users: labUsersList,
            title: event.target.title.value
        };

        fetch("http://localhost:9000/getuser/createLab", {
            method: "post",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(datalab)
        })
            .then((res) => res.json())
            .then((data) => {
                setLabUsersList([]);
                if (data.newlab === 0) {
                    setExists("");
                    checkStateLoadLabs();
                    setNewLab(0);
                } else if(data.newlab === 1) {
                    setExists("Lab already exists");
                }
            })

    }

    function editLab(event) {
        event.preventDefault();
        setLabToEdit(findArrayElementByTitle(data.labs, event.target.name.value));
        setLabEdit(1);
    }

    function addUserToList() {
        labUsersList.push(labUser);
        setLabUsersList(labUsersList);
        setLabUser("");
    }

    function cancel() {
        setNewLab(0);
        setLabEdit(0);
    }

    const inputStyle = {
        marginLeft: "10px",
        width: "15px"
    }

    function findArrayElementByTitle(array, title) {
        return array.find((element) => {
            return element.title === title;
        })
    }

    function postNewUsers(event) {
        event.preventDefault();

        var datalab = {
            users: labUsersList,
            title: event.target.title.value
        };

        fetch("http://localhost:9000/getuser/newuser", {
            method: "post",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(datalab)
        })
            .then((res) => res.json())
            .then((data) => {
                setLabUsersList([]);
                if (data.newlab === 0) {
                    checkStateLoadLabs();
                }
                setLabEdit(0);
            })
    }

    function removeUser(event) {
        event.preventDefault();

        var datalab = {
            title: event.target.title.value,
            name: event.target.nameToRemove.value
        };

        fetch("http://localhost:9000/getuser/removeuser", {
            method: "delete",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(datalab)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.newlab === 0) {
                    checkStateLoadLabs();
                }
                setLabEdit(0);
            })
    }

    function setDevice(event) {
        event.preventDefault();

        var data = {
            value: newValue
        };

        fetch("http://localhost:9000/setDevice", {
            method: "post",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.res) {
                    checkStateLoadLabs();
                }
                setLabEdit(0);
                setNewValue();
            })
    }

    function removeLab(event) {
        event.preventDefault();

        var datalab = {
            title: event.target.title.value
        };

        fetch("http://localhost:9000/getuser/removelab", {
            method: "delete",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(datalab)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.newlab === 0) {
                    checkStateLoadLabs();
                }
                setLabEdit(0);
            })
    }

    if (user && !newLab && !labEdit) {
        return (
            <div className="wrapper">
                <h3>Labs</h3>
                <div className="createLabWindows">
                    <form onSubmit={createLab}>
                        <input type="submit" value="+ New lab"/><br/>
                        <input style={{visibility: "hidden"}} type="text" value={1}/>
                        <br/>
                    </form>
                </div>

                {data.labs?.map(({floatshield, motoshield, title, manager, users}) =>
                    <div>
                        {floatshield ? (
                            <div>
                                <div className="breakline">
                                    {title}
                                </div>

                                <div className="dashboard-left">
                                    <Logs>
                                    </Logs>
                                    <br/>
                                    <Predictions>
                                    </Predictions>
                                    <br/>
                                </div>

                                <div className="dashboard-right">
                                    {manager ? (
                                        <div className="lab-user-panel">
                                            Users in this lab:<br/>
                                            {users?.map(value =>
                                                <p id="lab-users">
                                                    {value}
                                                </p>
                                            )}
                                            <br/>

                                            <form onSubmit={editLab}>
                                                <label>
                                                    Add user / <br/>
                                                    Remove user / <br/>
                                                    Delete lab
                                                    <input style={inputStyle} type="text" value={title} name="name"
                                                           hidden/>
                                                </label><br/><br/>
                                                <input type="submit" value="Edit lab"/><br/>
                                                <br/>
                                            </form>
                                        </div>
                                    ) : (<div/>)}
                                </div>
                            </div>
                        ) : (

                            motoshield ? (
                                <div>
                                    <div className="breakline">
                                        {title}
                                    </div>

                                    <div className="dashboard-left">
                                        <MotoLogs>
                                        </MotoLogs>
                                        <br/>
                                        <MotoPredictions>
                                        </MotoPredictions>
                                        <br/>
                                    </div>

                                    <div className="dashboard-right">
                                        {manager ? (
                                            <div className="lab-user-panel">
                                                Users in this lab:<br/>
                                                {users?.map(value =>
                                                    <p id="lab-users">
                                                        {value}
                                                    </p>
                                                )}
                                                <br/>

                                                <form onSubmit={editLab}>
                                                    <label>
                                                        Add user / <br/>
                                                        Remove user / <br/>
                                                        Delete lab
                                                        <input style={inputStyle} type="text" value={title} name="name"
                                                               hidden/>
                                                    </label><br/><br/>
                                                    <input type="submit" value="Edit lab"/><br/>
                                                    <br/>
                                                </form>
                                            </div>
                                        ) : (<div/>)}
                                    </div>
                                </div>
                            ) : <div/>)
                        }
                    </div>
                )}
            </div>
        );
    } else if (user && newLab && !labEdit) {
        return (
            <div>
                <div className="login-dashboard">
                    <form onSubmit={postDatalab}>
                        <label>
                            Add Device:<br/>
                            <select name="device" id="device">
                                <option value="FloatShield">FloatShield</option>
                                <option value="MotoShield">MotoShield</option>
                            </select><br/>
                        </label><br/>
                        <label>
                            Title of the Lab:<br/>
                            <input type="text" name="title" id="title" required/><br/>
                        </label>
                        <label>
                            Add User:<br/>
                            <input type="text" value={labUser} onChange={(e) => setLabUser(e.target.value)}
                            /><br/>
                        </label>
                        <button type="button" onClick={addUserToList}>Add</button>
                        <br/><br/>

                        <textarea cols="22" rows="10" value={labUsersList}>
                    </textarea><br></br>

                        <input type="submit" value="Create lab"/>
                        <button type="button" style={{marginLeft: "20px"}} onClick={cancel}>Cancel</button>
                        <br/>
                    </form>
                    <p>{exists}</p>
                </div>
                <br/>

            </div>
        )
    } else if (user && !newLab && labEdit) {
        return (
            <div>
                <div className="edit-lab-dashboard">
                    <div id="edit-lab-dashboard-left">
                        <form onSubmit={postNewUsers}>
                            <label>
                                Add User:<br/>
                                <input className="wide" type="text" value={labUser} onChange={(e) => setLabUser(e.target.value)}
                                /><br/>
                            </label>
                            <button className="editInput" type="button" onClick={addUserToList}>Add</button>
                            <br/><br/>

                            <textarea cols="22" rows="10" value={labUsersList}>
                    </textarea><br></br>
                            <input type="text" name="title" value={labToEdit.title} hidden/>
                            <input className="editInput" type="submit" value="Add users"/>
                        </form>
                        <br/>

                    </div>
                    <div id="edit-lab-dashboard-right">

                        {labToEdit.floatshield ? (
                            <form onSubmit={setDevice}>
                                <label>
                                    Set ball position:<br/>
                                </label>
                                <input className="wide" type="number" step="0.01" name="valueToSet" value={newValue} onChange={(e) => setNewValue(e.target.value)}/><br/>
                                <input className="editInput" type="submit" value="Set value"/>
                                <br/>
                            </form>

                        ) : (labToEdit.motoshield ? (
                            <form onSubmit={setDevice}>
                                <label>
                                    Set motor speed:<br/>
                                </label>
                                <input className="wide" type="number" step="0.01" name="valueToSet" value={newValue} onChange={(e) => setNewValue(e.target.value)}/><br/>
                                <input className="editInput" type="submit" value="Set value"/>
                                <br/>
                            </form>

                        ) : (<div/>))
                        }<br/>
                        <br/>

                        <form onSubmit={removeUser}>
                            <label>
                                Remove User:<br/>
                                <select className="wide" name="nameToRemove">
                                    {labToEdit.users?.map((value) =>
                                        <option value={value}>{value}</option>
                                    )}
                                </select><br/>
                            </label>
                            <input type="text" name="title" value={labToEdit.title} hidden/>
                            <input className="editInput" type="submit" value="Remove user"/>
                        </form>
                        <br/><br/>

                        <form onSubmit={removeLab}>
                            <label>
                                Delete lab:<br/>
                            </label>
                            <input type="text" name="title" value={labToEdit.title} hidden/>
                            <input className="editInput" type="submit" value="Delete"/>
                            <br/>
                        </form>
                        <br/>

                    </div>
                    <div style={{clear: "both"}}><br/><br/>
                        <button className="editInput" type="button" style={{marginLeft: "20px"}} onClick={cancel}>Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="article-dashboard">
            <h3>Labs</h3>
            <div className="login-dashboard" id="logout-dashboard">
                U need to log in to enter labs
                <br/><br/>
                <form onSubmit={toLogin}>
                    <input type="submit" value="Login"/><br/>
                    <input style={{visibility: "hidden"}} type="text" value={1}/>
                </form>
            </div>
        </div>
    )
}

export default Dashboard;
