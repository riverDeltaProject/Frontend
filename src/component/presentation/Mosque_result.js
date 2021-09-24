import React, {useEffect, useRef} from 'react';
import {Link} from "react-router-dom";
import Mosque_result_axios from './Mosque_result_axios.js';

import backicon from "../assets/backicon.png";

const {kakao} = window;
const options = {
  center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  level:3,
}

const Mosque_result = () => {
    const container = useRef(null);

    useEffect(()=>{
      new window.kakao.maps.Map(container.current, options);
      return ()=>{};
    }, [])
    return (
        <div>
            <Link to="./mosque_list"><img className="backicon" src={backicon} alt="backicon"/></Link>
            <div className="mosque_result_prom"/>
            <Mosque_result_axios/>
            <div className='myMapMosque' ref={container} style={{width:"500px", height:"500px"}}/>
        </div>
    );
};

export default Mosque_result;