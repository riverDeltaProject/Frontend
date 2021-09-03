import React from 'react';
import { Link } from "react-router-dom";
import Restaurant_result_axios from './Restaurant_result_axios.js';

import backicon from "../assets/backicon.png";

const Restaurant_result = () => {

  return (
    <div>
      <Link to="./restaurant_list"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <div className="rst_result_prom"/>
      <Restaurant_result_axios/>
    </div>
  );
};

export default Restaurant_result;