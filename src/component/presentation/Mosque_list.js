import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Item from './Item.js';
import Pagination from './Pagination.js';
import {mosque} from '../API/mosque_list';
import {mosqueEn} from '../API/mosque_En.js';

import icon_reset from "../assets/icon_reset.png";
import backicon from "../assets/backicon.png";
import icon_filter from "../assets/icon_filter.png"
import mosqueicon from "../assets/mosqueicon.png";
import homeIcon from "../assets/homeIcon.png"

import headerImg from "../assets/mosque_header.JPG"

const Mosque_list = () => {
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;
    const [option, setOption] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState(location.state.deState);

    const langData = location.state.langData;
    const i18n = location.state.i18n;

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setFilter(false);
        setModalOpen(false);
    }

    const setModal = () => {
        setFilter(true);
        setModalOpen(false);
    }

    const resetModal = () => {
        setOption("");
        setFilter(false);
    }

    //필터 리스트
    const makeList = () => {
        let result = (i18n === "kr")
            ? mosque
            : mosqueEn;

        if (option === "") {
            setFilter(false);
        } else {
            result = result.filter(key => key.type.includes(option))
        }

        return result;
    }

    //Pagination
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts = (tmp) => {
        return tmp.slice(indexOfFirst, indexOfLast);
    }

    let numOfFirst = currentPage - 4;
    let numOfLast = currentPage + 4;

    let aboutList = (i18n === "kr")
        ? mosque
        : mosqueEn;

    let mainArr = filter
        ? makeList() //얘는 잘 돌아감
        : aboutList; //근데 얘는 왜?

    let lastPage = parseInt(mainArr.length / 9);

    if (numOfFirst <= 0) { //numOfFirst가 1 이하로 내려가지 않도록
        numOfFirst = 1;
    }

    if (lastPage <= 9) {
        numOfLast = lastPage;
    } else {
        if (currentPage < 5) {
            numOfLast = 9;
        } else if (lastPage < numOfLast) {
            numOfLast = lastPage;
            numOfFirst = numOfLast - 8;
        }
    }

    if (lastPage === currentPage) {
        if ((numOfFirst - 8) <= 0) {
            numOfFirst = 1;
        } else {
            numOfFirst = currentPage - 8
        }
    }

    // 필터
    let target;
    let mosqType = "";

    const sel_mosq = (e) => {
        target = e.target.parentNode.nextSibling.innerText;
        mosqType = target
        setOption(mosqType);
    }

    const mosqFilter = <React.Fragment>
        <button className="button_filter" onClick={openModal}><img className="icon_filter" src={icon_filter} alt="icon_filter"/></button>
        <div
            className={modalOpen
                ? 'openModal modal'
                : 'modal'}>
            {
                modalOpen
                    ? (
                        <section>
                            <header>
                                <img
                                    className="icon_reset"
                                    src={icon_reset}
                                    alt="icon_reset"
                                    onClick={resetModal}/>
                                <p className="header_modal_mosque">{langData.filter}</p>
                            </header>
                            <main>
                                <div className="placetype">
                                    <div>
                                        <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                        <p>{langData.mosq}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                        <p>{langData.prayerroom}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                        <p>{langData.worship}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                        <p>{langData.prayer}</p>
                                    </div>
                                </div>
                            </main>
                            <footer className="footer_modal_mosque">
                                <button className="close" onClick={closeModal}>
                                    {langData.cancel}
                                </button>
                                <button className="close" onClick={setModal}>
                                    {langData.apply}
                                </button>
                            </footer>
                        </section>
                    )
                    : null
            }
        </div>
    </React.Fragment>

    return (
        <div>
            <img src={headerImg} className="headerImg" alt="Mosque list"/>

            <div className="header2">
                <Link to="./">
                    <img className="backicon" src={backicon} alt="backicon"/></Link>
                <h1>{langData.mosqTitle}</h1>
                <div className="btn_class_M">{mosqFilter}</div>
            </div>
            <div className="header_list">
                <div className="headerTitle">
                    <Link
                        to={{
                            pathname: "/",
                            state: {
                                langData: langData,
                                i18n: i18n
                            }
                        }}><img src={homeIcon} alt={homeIcon}/></Link>
                    <h1>{langData.mosqTitle}</h1>
                </div>
                <div className="btn_class_att">
                    {mosqFilter}
                </div>
            </div>
            <div className="list">
                <Item
                    rlist={filter
                        ? currentPosts(makeList())
                        : currentPosts(aboutList)}
                    filType={option}
                    moveTo="mosq"
                    langData={langData}
                    i18n={i18n}/></div>
            <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}></Pagination>
        </div>
    );
};

export default Mosque_list;