import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import Modal from './Modal.js';

import mainicon from "../assets/mainicon.png"
import attractionicon from "../assets/attractionicon.png"
import restauranticon from "../assets/restauranticon.png"
import mosqueicon from "../assets/mosqueicon.png"

const Home = () => {
    const history = useHistory();

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const [lang, setLang] = useState("KorService")

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const selectLang = (e) => {
        setLang(e.target.value)
    }

    const clickBtn = (moveTo) => {

        let url = "./searcharea";
        history.push({
            pathname: url,
            state: {
                moveTo: moveTo,
                lang: lang
            }
        })
    }

    const clickMos = (moveTo) => {
        history.push({
            pathname: `./mosque_list`,
            state: {
                deState: false
            }
        })
    }

    return (
        <div>
            <div className="header">
                <h1 >리버델타</h1>
                <React.Fragment>
                    <button className="lang" onClick={openModal}>Aa</button>
                    <Modal open={modalOpen} close={closeModal} header="언어 설정">
                        <select className="langoption" onChange={selectLang}>
                            <option value="KorService">한국어</option>
                            <option value="EngService">English</option>
                        </select>
                    </Modal>
                </React.Fragment>
            </div>
            <div id="maindiv">
                <div>
                    <div>
                        대충 모토
                        <h3>리버델타의 정의를 설명하는 문구가 들어가면 됩니다</h3>
                        뭔가 주저리주저리 들어가면 되는데 리버델타가 뭐하는 앱인지 있잖아 가족친화적이고 뭐 그런 거 있잖
                    </div>
                    <Link to="./Howto" className="howto2">어플리케이션 설치</Link>
                </div>
                <img className="mainicon" src={mainicon} alt="mainicon"/>
            </div>
            <p className="findingplace">장소 찾기</p>
            <div className="container">
                <div>
                    <img
                        className="item"
                        src={restauranticon}
                        alt="restauranticon"
                        onClick={() => {
                            clickBtn("restaurant")
                        }}/>
                    <p>식당</p>
                </div>
                <div>
                    <img
                        className="item"
                        src={attractionicon}
                        alt="attractionicon"
                        onClick={() => {
                            clickBtn("attraction")
                        }}/>
                    <p>관광지</p>
                </div>
                <div>
                    <img className="item" src={mosqueicon} alt="mosqueicon" onClick={clickMos}/>
                    <p>모스크</p>
                </div>
            </div>
            <Link to="./Howto" className="howto">App 버전 사용 방법</Link>
        </div>
    );
};

export default Home;