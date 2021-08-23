import React from 'react';
import { Link } from "react-router-dom";

import mainicon from "../assets/mainicon.png"
import attractionicon from "../assets/attractionicon.png"
import restauranticon from "../assets/restauranticon.png"
import mosqueicon from "../assets/mosqueicon.png"

const Home = () => {
  return (
    <div>
      <Link to="./Language" className="lang">Aa</Link>
      <h1 className="header">RIVERDELTA</h1>
      <img className="mainicon" src={mainicon} alt="mainicon" />
      <p className="findingplace">장소 찾기</p>
      <div className="container">
        <div>
          <Link to="./Restaurant"><img className="item" src={restauranticon} alt="restauranticon" /></Link>
          <p>식당</p>
        </div>
        <div>
          <Link to="./Attraction"><img className="item" src={attractionicon} alt="attractionicon" /></Link>
          <p>관광지</p>
        </div>
        <div>
          <Link to="./Mosque"><img className="item" src={mosqueicon} alt="mosqueicon" /></Link>
          <p>모스크</p>
        </div>
      </div>
      <Link to="./Howto" className="howto">App 버전 사용 방법</Link>
    </div>
  );
};

export default Home;