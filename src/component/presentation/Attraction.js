import React from 'react';
import { Link } from "react-router-dom";

import backicon from "../assets/backicon.png";

const Attraction = () => {

  return (
    <div>
      <Link to="./"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <h1 className="header2">위치설정</h1>
      <p className="normalfont">찾고 싶은 위치 및 장소를 입력하세요</p>
      <div className="btn_class_att">
        <form action="search.php" method="post">
          <input className="btn_text_att" type="text" />
          <input className="btn_submit_att" type="submit" value="SEARCH" />
       </form>
      </div>
      <p className="findingplace">광역시</p>
      <div className="container_att">
        <button className="item_att">서울시</button>
        <button className="item_att">부산시</button>
        <button className="item_att">대구시</button>
      </div>
      <p className="findingplace">시/군/구</p>
      <div className="container_att2">
        <button className="item_att2">강남구</button>
        <button className="item_att2">강동구</button>
        <button className="item_att2">강서구</button>
      </div>
    </div>
  );
};

export default Attraction;