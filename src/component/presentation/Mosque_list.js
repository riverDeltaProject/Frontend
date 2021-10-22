import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Item from './Item.js';
import Pagination from './Pagination.js';
import {mosque} from '../API/mosque_list'

import icon_reset from "../assets/icon_reset.png";
import backicon from "../assets/backicon.png";
import icon_filter from "../assets/icon_filter.png"
import mosqueicon from "../assets/mosqueicon.png";

import headerImg from "../assets/mosque_header.JPG"

const Mosque_list = () => {
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [option, setOption] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState(location.state.deState);

    const tmp = (location.state.lang === "KorService")
    ? [
        "모스크",
        "필터",
        "성원",
        "기도실",
        "예배소",
        "기도처",
        "취소",
        "적용"
    ]
    : [
        "Mosque",
        "Filter",
        "Mosque",
        "Prayer room",
        "Place of Worship",
        "Place of Prayer",
        "Cancel",
        "Apply"
    ];

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
        let result = mosque;

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

    let mainArr = filter
        ? makeList() //얘는 잘 돌아감
        : mosque; //근데 얘는 왜?

    let lastPage = parseInt(mainArr.length / 6);

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

    // 필터
    let target;
    let mosqType = "";

    const sel_mosq = (e) => {
        target = e.target.parentNode.nextSibling.innerText;
        mosqType = target
        setOption(mosqType);
    }

    return (
        <div>
            <Link to="./">
                <img className="backicon" src={backicon} alt="backicon"/>
            </Link>
            <img src={headerImg} className="headerImg" alt="Mosque list" />
           
            <h1 className="header2">{tmp[0]}</h1>
            <div className="att_prom">
                <div className="prom_text_att">
                    <p className="name_att">모스크명</p>
                    <p className="scorepos_att">가게 위치</p>
                </div>
            </div>
            <div className="btn_class_att">
                <input className="btn_text_att" type="text"/>
                <input className="btn_submit_att" type="submit" value="SEARCH"/>

                <React.Fragment>
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
                                            <p className="header_modal_mosque">{tmp[1]}</p>
                                        </header>
                                        <main>
                                            <div className="placetype">
                                                <div>
                                                    <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                                    <p>{tmp[2]}</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                                    <p>{tmp[3]}</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                                    <p>{tmp[4]}</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                                    <p>{tmp[5]}</p>
                                                </div>
                                            </div>
                                        </main>
                                        <footer className="footer_modal_mosque">
                                            <button className="close" onClick={closeModal}>
                                                {tmp[6]}
                                            </button>
                                            <button className="close" onClick={setModal}>
                                                {tmp[7]}
                                            </button>
                                        </footer>
                                    </section>
                                )
                                : null
                        }
                    </div>
                </React.Fragment>
            </div>
            <div className="list">
                <Item
                    rlist={filter
                        ? currentPosts(makeList())
                        : currentPosts(mosque)}
                    filType={option}
                    moveTo="mosque"/></div>
            <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}></Pagination>
        </div>
    );
};

export default Mosque_list;