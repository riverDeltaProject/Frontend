import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Modal_Mosque from './Modal_Mosque.js';
import Mosque_list_axios from './Mosque_list_axios.js';

import backicon from "../assets/backicon.png";
import icon_filter from "../assets/icon_filter.png"
import mosqueicon from "../assets/mosqueicon.png";

const Mosque_list = () => {

  const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

  return (
    <div>
      <Link to="./"><img className="backicon" src={backicon} alt="backicon" /></Link>
      <h1 className="header2">모스크</h1>
      <div className="mosque_prom">
        <div className="prom_text_mosque">
          <p className="name_mosque">모스크명</p>
          <p className="scorepos_mosque">가게 위치</p>
        </div>
      </div>
      <div className="btn_class_mosque">
        <form action="search.php" method="post">
          <input className="btn_text_mosque" type="text" />
          <input className="btn_submit_mosque" type="submit" value="SEARCH" />
       </form>
       <React.Fragment>
            <button className="button_filter" onClick={ openModal }><img className="icon_filter" src={icon_filter} alt="icon_filter" /></button>
            <Modal_Mosque open={ modalOpen } close={ closeModal } header="필터">
              <div className="placetype">
                <div>
                 <button><img className="icon_mosque" src={mosqueicon} alt="mosqueicon" /></button>
                 <p>모스크</p>
                </div>
                <div>
                 <button><img className="icon_mosque" src={mosqueicon} alt="mosqueicon" /></button>
                 <p>기도실</p>
                </div>
              </div>
            </Modal_Mosque>
        </React.Fragment>
      </div>
      <Mosque_list_axios />
    </div>
  );
};

export default Mosque_list;