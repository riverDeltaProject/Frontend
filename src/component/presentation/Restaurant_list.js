import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Modal from './Modal.js';

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
            <Modal open={ modalOpen } close={ closeModal } header="필터">
              <p>음식종류</p>
            </Modal>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Restaurant_list;