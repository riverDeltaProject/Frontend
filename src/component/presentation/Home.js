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
    const [lang, setLang] = useState("KorService");

    
    const tmp = (lang === "KorService")
        ? [
            "리버델타",
            "언어설정",
            "대충모토",
            "리버델타 정의 문구",
            "뭔가 주저리주저리",
            "어플리케이션 설치",
            "장소 찾기",
            "식당",
            "관광지",
            "모스크",
            "APP 버전 사용 방법"
        ]
        : [
            "RiverDelta",
            "Langauge",
            "aaa",
            "bbb",
            "ccc",
            "Install Application",
            "Find Place",
            "Restaurant",
            "Attraction",
            "Mosque",
            "How To Use Application Version"
        ];

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
                deState: false,
                lang: lang
            }
        })
    }

    return (
        <div>
            <div className="header">
                <h1>{tmp[0]}</h1>
                <React.Fragment>
                    <button className="lang" onClick={openModal}>Aa</button>
                    <Modal open={modalOpen} close={closeModal} header={tmp[1]}>
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
                        {tmp[2]}
                        <h3>{tmp[3]}</h3>
                        {tmp[4]}
                    </div>
                    <Link to="./Howto" className="howto2">{tmp[5]}</Link>
                </div>
                <img className="mainicon" src={mainicon} alt="mainicon"/>
            </div>
            <p className="findingplace">{tmp[6]}</p>
            <div className="container">
                <div>
                    <img
                        className="item"
                        src={restauranticon}
                        alt="restauranticon"
                        onClick={() => {
                            clickBtn("restaurant")
                        }}/>
                    <p>{tmp[7]}</p>
                </div>
                <div>
                    <img
                        className="item"
                        src={attractionicon}
                        alt="attractionicon"
                        onClick={() => {
                            clickBtn("attraction")
                        }}/>
                    <p>{tmp[8]}</p>
                </div>
                <div>
                    <img className="item" src={mosqueicon} alt="mosqueicon" onClick={clickMos}/>
                    <p>{tmp[9]}</p>
                </div>
            </div>
            <Link to="./Howto" className="howto">{tmp[10]}</Link>
        </div>
    );
};

export default Home;