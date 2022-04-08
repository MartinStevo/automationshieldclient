import React, {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";

function App() {

    return (
        <Router>
            <Nav/>
            <div className="fancy">Welcome to AutomationShield hardware Dashboard</div>
            <div className="App">
                <Routes>
                    <Route path='/Dashboard' exact element={<Dashboard/>}/>
                    {/*<Route path='/Dashboard/Logs' exact element={<Logs/>}/>*/}
                    {/*<Route path='/Dashboard/Predictions' exact element={<Predictions/>}/>*/}
                    <Route path='/Users' exact element={<Users/>}/>
                </Routes>
            </div>
        </Router>
    );
    //}
}

export default App;
