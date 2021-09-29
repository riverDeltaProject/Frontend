import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

import backicon from "../assets/backicon.png";

const Restaurant_result = () => {
    const location = useLocation();
    const about = location.state.data;

    console.log(about)

    return (
        <div>
            <Link to="./restaurant_list"><img className="backicon" src={backicon} alt="backicon"/></Link>
            <div className="rst_result_prom"/>
            <div className="rst_result_cell">
                <div>
                    <div className="rst_result_name">{about.name}</div>
                    <div className="rst_result_position">{about.address}</div>
                </div>
            </div>
        </div>
    );
};

export default Restaurant_result;