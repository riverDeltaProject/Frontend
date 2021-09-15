import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Mosque_result_axios from './Mosque_result_axios.js';

import backicon from "../assets/backicon.png";

const Mosque_result = () => {

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
      <Link to="./mosque_list"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <div className="mosque_result_prom"/>
      <Mosque_result_axios/>
      {/* <div className='myMapMosque'/> */}
    </div>
  );
};

export default Mosque_result;