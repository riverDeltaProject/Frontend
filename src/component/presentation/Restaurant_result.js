import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Restaurant_result_axios from './Restaurant_result_axios.js';

import backicon from "../assets/backicon.png";

const Restaurant_result = () => {

  // const { kakao } = window;

  // useEffect(() => {
  //   const container = document.getElementsByClassName('myMap');
  //   const options = {
  //   center: new kakao.maps.LatLng(33.450701, 126.570667),
  //   level: 3
  //   };
  //   const map = new kakao.maps.Map(container, options);
  // }, []);

  return (
    <div>
      <Link to="./restaurant_list"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <div className="rst_result_prom"/>
      <Restaurant_result_axios/>
      {/* <div className='myMap'/> */}
    </div>
  );
};

export default Restaurant_result;