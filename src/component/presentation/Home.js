import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Modal from './Modal.js';
import {useTranslation} from 'react-i18next';

import {data} from '../../data.js';

import mainicon from "../assets/mainicon.png"
import attractionicon from "../assets/attractionicon.png"
import restauranticon from "../assets/restauranticon.png"
import mosqueicon from "../assets/mosqueicon.png"
import SwitchLang from './SwitchLang.js';

const Home = () => {
    const {i18n} = useTranslation();

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        if (i18n.language === 'kr') {
            setAllData(data.kr);
        } else {
            setAllData(data.en);
        }
    }, [i18n.language])

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div>
            <div className="header">
                <h1>{allData.title}</h1>
                <React.Fragment>
                    <button className="lang" onClick={openModal}>Aa</button>
                    <Modal open={modalOpen} close={closeModal} header={allData.setLang}>
                        <SwitchLang i18n={i18n}/>
                    </Modal>
                </React.Fragment>
            </div>
            <div id="maindiv">
                <div>
                    <div>
                        <h3>{allData.mainTitle}</h3>
                        <p>{allData.subTitle}</p>
                    </div>
                    <Link to="./Howto" className="howto2">{allData.setApp}</Link>
                </div>
                <img className="mainicon" src={mainicon} alt="mainicon"/>
            </div>
            <p className="findingplace">{allData.findPlace}</p>
            <div className="container">
                <div>
                    <Link
                        to={{
                            pathname: "./search",
                            state: {
                                langData: allData,
                                i18n: i18n.language,
                                moveTo: "rest"
                            }
                        }}><img className="item" src={restauranticon} alt="restauranticon"/></Link>
                    <p>{allData.rest}</p>
                </div>
                <div>
                    <Link
                        to={{
                            pathname: "./search",
                            state: {
                                langData: allData,
                                i18n: i18n.language,
                                moveTo: "attr"
                            }
                        }}>
                        <img className="item" src={attractionicon} alt="attractionicon"/></Link>
                    <p>{allData.att}</p>
                </div>
                <div>
                    <Link
                        to={{
                            pathname: "./mosqlist",
                            state: {
                                langData: allData,
                                i18n: i18n.language,
                                moveTo: "attr"
                            }
                        }}>
                        <img className="item" src={mosqueicon} alt="mosqueicon"/></Link>
                    <p>{allData.mos}</p>
                </div>
            </div>
            <Link to="./Howto" className="howto">{allData.howTo}</Link>
        </div>
    );
};

export default Home;