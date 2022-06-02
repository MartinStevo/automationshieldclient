import React, {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Error from "./components/Error";

function App() {

    return (
        <Router>
            <Nav/>
            <section>
                <div className="fancy"><Link style={{textDecoration: "none", color: "black"}} to='/'>AutomationShield hardware
                    Dashboard</Link></div>
                <Routes>
                    <Route path='/' exact element={<Home />}/>
                    <Route path='/Dashboard' exact element={<Dashboard/>}/>
                    <Route path='/Users' exact element={<Users/>}/>
                    <Route path='*' exact element={<Error/>}/>
                </Routes>
            </section>
        </Router>
    );
    //}
}

const Home = () => (
    <div />
)

export default App;
