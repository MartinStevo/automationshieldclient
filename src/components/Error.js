import React from "react";
import {useNavigate} from 'react-router-dom'

function Error() {

    let navigate = useNavigate();

    return (
        <div>
            <h2>Page not found</h2>
            <button onClick={() => {
                navigate("/");
            }}>
                Home page
            </button>
        </div>
    );
}

export default Error;