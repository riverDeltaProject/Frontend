import React from 'react';
import { Link } from "react-router-dom";

import backicon from "../assets/backicon.png";

const Restaurant = () => {

  return (
    <div>
      <Link to="./"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <h1 className="header2">위치설정</h1>
      <p className="normalfont">찾고 싶은 위치 및 장소를 입력하세요</p>
      <div className="btn_class">
        <form action="search.php" method="post">
          <input className="btn_text" type="text" />
          <input className="btn_submit" type="submit" value="SEARCH" />
       </form>
      </div>
      <p className="findingplace">광역시</p>
      <div className="containerList">
        <button className="itemList">서울시</button>
        <button className="itemList">부산시</button>
        <button className="itemList">대구시</button>
      </div>
      <p className="findingplace">시/군/구</p>
      <div className="containerList2">
        <button className="itemList2">강남구</button>
        <button className="itemList2">강동구</button>
        <button className="itemList2">강서구</button>
      </div>
    </div>
  );
};

export default Restaurant;