import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Modal_Restaurant from './Modal_Restaurant.js';

import backicon from "../assets/backicon.png";
import scorestar from "../assets/scorestar.png";
import icon_filter from "../assets/icon_filter.png"

const Restaurant_list = () => {

  const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

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
            <p className="score">N.N점</p>
          </div>
        </div>
      </div>
      <div className="btn_class_list">
        <form action="search.php" method="post">
          <input className="btn_text_list" type="text" />
          <input className="btn_submit_list" type="submit" value="SEARCH" />
       </form>
       <React.Fragment>
            <button className="button_filter" onClick={ openModal }><img className="icon_filter" src={icon_filter} alt="icon_filter" /></button>
            <Modal_Restaurant open={ modalOpen } close={ closeModal } header="필터">
              <p className="langoption">음식 종류</p>
              <div className="foodtype">
               <button className="itemList2">뷔페</button>
               <button className="itemList2">아시아</button>
               <button className="itemList2">양식</button>
               <button className="itemList2">인도</button>
               <button className="itemList2">네팔</button>
               <button className="itemList2">일식</button>
               <button className="itemList2">중식</button>
               <button className="itemList2">터키</button>
               <button className="itemList2">한식</button>
               <button className="itemList2">중식</button>
               <button className="itemList2">그 외</button>
               {/* 3개 이하: 말레이시아, 모로코, 아랍, 이집트, 중동식, 중식, 튀니지, 파키스탄, 프랑스, 우즈베키스탄 분류없음 */}
              </div>
              <p className="langoption">Halal Standard</p>
            </Modal_Restaurant>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Restaurant_list;