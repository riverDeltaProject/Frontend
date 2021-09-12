import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Attraction_result_axios from './Attraction_result_axios.js';

import backicon from "../assets/backicon.png";

const Attraction_result = () => {

  // const { kakao } = window;

  // useEffect(() => {
  //   const container = document.getElementsByClassName('myMapAtt');
  //   const options = {
  //   center: new kakao.maps.LatLng(33.450701, 126.570667),
  //   level: 3
  //   };
  //   const map = new kakao.maps.Map(container, options);
  // }, []);

  return (
    <div>
      <Link to="./attraction_list"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <div className="att_result_prom"/>
      <Attraction_result_axios/>
      {/* <div className='myMapAtt'/> */}
    </div>
  );
};

export default Attraction_result;