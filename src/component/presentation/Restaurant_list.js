import React from 'react';
import { Link } from "react-router-dom";

import backicon from "../assets/backicon.png";
import scorestar from "../assets/scorestar.png";

const Restaurant_list = () => {

  return (
    <div>
      <Link to="./restaurant"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <h1 className="header2">식당</h1>
      <div className="restaurant_promotion">
        <div className="promotion_text">
          <p className="name_restaurant">가게명</p>
          <div>
            <p className="scoreposition">가게 위치</p>
            <img className="scorestar" src={scorestar} alt="scorestar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant_list;