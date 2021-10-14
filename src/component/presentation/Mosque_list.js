import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Item from './Item.js';
import Pagination from './Pagination.js';
import {mosque} from '../API/mosque_list'

import icon_reset from "../assets/icon_reset.png";
import backicon from "../assets/backicon.png";
import icon_filter from "../assets/icon_filter.png"
import mosqueicon from "../assets/mosqueicon.png";

const Mosque_list = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [option, setOption] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState(false);

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
            return;
        } else {
            result = result.filter(key => key.type.includes(option))
            return result;
        }
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

    let lastPage = parseInt(mainArr.length / 6) + 1;

    if (numOfFirst <= 0) {
        numOfFirst = 1;
        if (numOfLast < lastPage) {
            numOfLast = 9;
        } else {
            numOfLast = lastPage;
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
            <Link to="./"><img className="backicon" src={backicon} alt="backicon"/></Link>
            <h1 className="header2">모스크</h1>
            <div className="mosque_prom">
                <div className="prom_text_mosque">
                    <p className="name_mosque">모스크명</p>
                    <p className="scorepos_mosque">가게 위치</p>
                </div>
            </div>
            <div className="btn_class_mosque">
                <form action="search.php" method="post">
                    <input className="btn_text_mosque" type="text"/>
                    <input className="btn_submit_mosque" type="submit" value="SEARCH"/>
                </form>
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
                                            <p className="header_modal_mosque">필터</p>
                                        </header>
                                        <main>
                                            <div className="placetype">
                                                <div>
                                                    <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                                    <p>성원</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                                    <p>기도실</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                                    <p>예배소</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_mosq}><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                                    <p>기도처</p>
                                                </div>
                                            </div>
                                        </main>
                                        <footer className="footer_modal_mosque">
                                            <button className="close" onClick={closeModal}>
                                                취소
                                            </button>
                                            <button className="close" onClick={setModal}>
                                                적용
                                            </button>
                                        </footer>
                                    </section>
                                )
                                : null
                        }
                    </div>
                </React.Fragment>
            </div>

            <Item
                rlist={filter
                    ? currentPosts(makeList())
                    : currentPosts(mosque)}
                moveTo="mosque"/>
            <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}></Pagination>
        </div>
    );
};

export default Mosque_list;