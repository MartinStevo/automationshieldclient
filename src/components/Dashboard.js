import '../App.css';
import {Link, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import Logs from "./FloatShield/Logs";
import Predictions from "./FloatShield/Predictions";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(0);
    const [lab, setLab] = useState(0);
    const [data, setData] = useState([]);
    const [fs, setFS] = useState(false);
    const [ms, setMS] = useState(false);

    function checkStateLoadLabs() {
        fetch("http://localhost:9000/getuser/statelabs", {
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
        setLab(1);
        setFS(false);
        setMS(false);
    }

    function postDatalab(event) {
        event.preventDefault();

        fetch("http://localhost:9000/getuser/createLab", {
            method: "post",
            headers: {
                'Content-type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({floatshield: fs, motoshield: ms})
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.newlab === 0) {
                    setData(data);
                    setUser(1);
                    setLab(0);
                }
                setLab(0);
            })

    }

    const labStyle = {
        color: "white",
        backgroundColor: "black",
        padding: "5px",
        fontfamily: "Trattatello, fantasy"
    }

    const inputStyle = {
        marginLeft: "10px",
        width: "15px"
    }

    if (user && !lab) {
        return (
            <div className="wrapper">
                <h3 style={labStyle}>Labs</h3>
                <form onSubmit={createLab}>
                    <input type="submit" value="+ New lab"/><br/>
                    <input style={{visibility: "hidden"}} type="text" value={1}/>
                    <br/>
                </form>
                {data.labs?.map(({floatshield, motoshield}) =>
                    <div className="labs">
                        {floatshield ? (
                            <div>
                                <h4>FloatShield data</h4>
                                <Logs>
                                </Logs>
                                <br/>
                                <Predictions>
                                </Predictions>
                            </div>
                        ) : (
                            <div>No FloatShield added</div>
                        )}
                    </div>
                )}
                <br></br>
            </div>
        );
    } else if (user && lab) {
        return (
            <div className="section-left">
                <form onSubmit={postDatalab}>
                    <label>
                        FloatShield:
                        <input style={inputStyle} type="checkbox" onChange={(e) => setFS(e.target.checked)}/>
                    </label><br/>
                    <label>
                        MotoShield:
                        <input style={inputStyle} type="checkbox" onChange={(e) => setMS(e.target.checked)}/>
                    </label><br/><br/>
                    <input type="submit" value="Create lab"/><br/>
                    <br/>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h3 style={labStyle}>Labs</h3>
            <div className="section-left">
                U need to login to enter labs
                <br/><br/>
                <form onSubmit={toLogin}>
                    <input type="submit" value="Go to login"/><br/>
                    <input style={{visibility: "hidden"}} type="text" value={1}/>
                </form>
            </div>
        </div>
    )
}

export default Dashboard;
