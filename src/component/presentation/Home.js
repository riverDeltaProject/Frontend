import React, {useState} from 'react';
import {Link, useLocation, useHistory} from "react-router-dom";
import Modal from './Modal.js';

import mainicon from "../assets/mainicon.png"
import attractionicon from "../assets/attractionicon.png"
import restauranticon from "../assets/restauranticon.png"
import mosqueicon from "../assets/mosqueicon.png"



const Home = () => {
    const location = useLocation();
    const history = useHistory();

    console.log(location.state)
    
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const [lang, setLang] = useState((location.state === undefined)?"KorService":location.state.lang);

    
    const tmp = (lang === "KorService")
        ? [
            "리버델타",
            "언어설정",
            "좋은 식사가 좋은 여행을 만듭니다",
            "다음과 같은 한국 속담이 있습니다: 금강산도 식후경이다. 좋은 경치도 배가 불러야 눈에 들어온다는 뜻입니다. 우리는 한국을 방문하는 모두가 편안한 한 끼를 먹을 수 있도록, 여행지와 할랄 식당 사이의 동선을 안내합니다. 당신의 여행이 더욱 다채롭기를 바라며, 리버델타.",
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
            "A good meal makes a good trip",
            "There is a Korean saying: Food before Mt. Geumgang. It means a good view can only be enjoyed when you are full. We guide the route between travel destinations and halal restaurants so that everyone who visits Korea can enjoy a comfortable meal. We hope to make your trip more colorful, River Delta",
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
                        <h3>{tmp[2]}</h3>
                        {tmp[3]}
                    </div>
                    <Link to="./Howto" className="howto2">{tmp[4]}</Link>
                </div>
                <img className="mainicon" src={mainicon} alt="mainicon"/>
            </div>
            <p className="findingplace">{tmp[5]}</p>
            <div className="container">
                <div>
                    <img
                        className="item"
                        src={restauranticon}
                        alt="restauranticon"
                        onClick={() => {
                            clickBtn("restaurant")
                        }}/>
                    <p>{tmp[6]}</p>
                </div>
                <div>
                    <img
                        className="item"
                        src={attractionicon}
                        alt="attractionicon"
                        onClick={() => {
                            clickBtn("attraction")
                        }}/>
                    <p>{tmp[7]}</p>
                </div>
                <div>
                    <img className="item" src={mosqueicon} alt="mosqueicon" onClick={clickMos}/>
                    <p>{tmp[8]}</p>
                </div>
            </div>
            <Link to="./Howto" className="howto">{tmp[9]}</Link>
        </div>
    );
};

export default Home;