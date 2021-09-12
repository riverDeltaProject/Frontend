import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Modal from './Modal.js';

import mainicon from "../assets/mainicon.png"
import attractionicon from "../assets/attractionicon.png"
import restauranticon from "../assets/restauranticon.png"
import mosqueicon from "../assets/mosqueicon.png"

const Home = () => {

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

  return (
    <div>
      <React.Fragment>
            <button className="lang" onClick={ openModal }>Aa</button>
            <Modal open={ modalOpen } close={ closeModal } header="언어 설정">
              <select className="langoption">
                <option>한국어</option>
                <option>English</option>
              </select>
            </Modal>
        </React.Fragment>

      <h1 className="header">RIVERDELTA</h1>
      <img className="mainicon" src={mainicon} alt="mainicon" />
      <p className="findingplace">장소 찾기</p>
      <div className="container">
        <div>
          <Link to="./restaurant"><img className="item" src={restauranticon} alt="restauranticon" /></Link>
          <p>식당</p>
        </div>
        <div>
          <Link to="./attraction"><img className="item" src={attractionicon} alt="attractionicon" /></Link>
          <p>관광지</p>
        </div>
        <div>
          <Link to="./attraction_result"><img className="item" src={mosqueicon} alt="mosqueicon" /></Link>
          <p>모스크</p>
        </div>
      </div>
      <Link to="./Howto" className="howto">App 버전 사용 방법</Link>
    </div>
  );
};

export default Home;