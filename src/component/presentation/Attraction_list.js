import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Modal_Attraction from './Modal_Attraction.js';
import Attraction_list_axios from './Attraction_list_axios.js';

import backicon from "../assets/backicon.png";
import scorestar from "../assets/scorestar.png";
import icon_filter from "../assets/icon_filter.png";
// 아이콘 받기 전이라 임시로 넣어둠
import attractionicon from "../assets/attractionicon.png";

const Attraction_list = () => {

  const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

  return (
    <div>
      <Link to="./attraction"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <h1 className="header2">관광지</h1>
      <div className="att_prom">
        <div className="prom_text_att">
          <p className="name_att">관광지명</p>
          <div>
            <p className="scorepos_att">관광지 위치</p>
            <img className="scorestar" src={scorestar} alt="scorestar" />
            <p className="score_att">N.N점</p>
          </div>
        </div>
      </div>
      <div className="btn_class_att">
        <form action="search.php" method="post">
          <input className="btn_text_att" type="text" />
          <input className="btn_submit_att" type="submit" value="SEARCH" />
       </form>
       <React.Fragment>
            <button className="button_filter" onClick={ openModal }><img className="icon_filter" src={icon_filter} alt="icon_filter" /></button>
            <Modal_Attraction open={ modalOpen } close={ closeModal } header="테마">
              <div className="atttype">
                <div>
                  {/* 아이콘 받기 전이라 임시로 넣어둠 */}
                 <button><img className="icon_att" src={attractionicon} alt="attractionicon" /></button>
                 <p>인증됨</p>
                </div>
              </div>
            </Modal_Attraction>
        </React.Fragment>
      </div>
      <Attraction_list_axios />
    </div>
  );
};

export default Attraction_list;