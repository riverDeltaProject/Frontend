import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Item from './Item_rest.js';
import backicon from "../assets/backicon.png";
import scorestar from "../assets/scorestar.png";
import icon_filter from "../assets/icon_filter.png"
import icon_halal_certified from "../assets/icon_halal_certified.png";
import icon_muslim_friendly from "../assets/icon_muslim_friendly.png";
import icon_pork_free from "../assets/icon_pork_free.png";
import icon_self_certified from "../assets/icon_self_certified.png";
import icon_reset from "../assets/icon_reset.png";
import {restKor} from "../API/rest"
import {restEn} from "../API/restEn"
import Pagination from './Pagination.js';

import Notfound from "../assets/notfound.png"
import headerImg from "../assets/restaurant_header.JPG"
import homeIcon from "../assets/homeIcon.png"

const Restaurant_list = () => {
    const location = useLocation();

    const code = location.state.code;
    const deState = location.state.deState;
    const optionList = location.state.optList;
    const i18n = location.state.i18n;
    const langData = location.state.langData;

    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [option, setOption] = useState(optionList);
    const [filter, setFilter] = useState(deState);

    // 지역에 맞게 리스트 추려내기
    let locList = (i18n === "kr")
        ? restKor.filter(
            key => (key.address.includes(code["area"]) && key.address.includes(code["city"]))
        )
        : restEn.filter(
            key => (key.address.includes(code["area"]) && key.address.includes(code["city"]))
        );

    console.log(Math.floor(Math.random()*locList.length))

    const openModal = () => {
        setModalOpen(true);
    }

    const resetModal = () => {
        setOption((tmp) => ({
            ...tmp,
            "type": [],
            "friendly": ""
        }));
        setFilter(false);
    }

    const closeModal = () => {
        setOption((tmp) => ({
            ...tmp,
            "type": [],
            "friendly": ""
        }))
        setFilter(false);
        setModalOpen(false);
    }

    const setModal = () => {
        setFilter(true);
        setModalOpen(false);
    }

    // 필터 후에 여러 개 추가 만들기
    let target;

    const sel_Food = (e) => {
        if (e.target.tagName === "BUTTON") {
            target = e.target.innerText;
            if (!option.type.includes(target)) 
                setOption((tmp) => ({
                    ...tmp,
                    "type": option
                        .type
                        .concat(target)
                }))
        } else {
            target = e.target.parentNode.nextSibling.innerText;
            setOption((tmp) => ({
                ...tmp,
                "friendly": target
            }))
        }
    }

    //필터에 선택한 항목대로 리스트 만들기
    const list = () => {
        let result = locList;
        let tmp = [];

        if ((option.friendly !== "") && (option.type.length !== 0)) {
            for (let i = 0; i < option.type.length; i++) {
                if (i === 0) {
                    result = result.filter(key => {
                        key
                            .foodType
                            .includes(option.type[i])
                    })
                } else {
                    tmp = locList.filter(key => key.foodType.includes(option.type[i]))
                    result = result.concat(tmp)
                }
            }

            result = result.filter(key => (key.friendly === option.friendly))
        } else if ((option.friendly === "") && (option.type.length !== 0)) {
            for (let i = 0; i < option.type.length; i++) {
                if (i === 0) 
                    result = result.filter(key => key.foodType.includes(option.type[i]))
                else {
                    tmp = locList.filter(key => key.foodType.includes(option.type[i]))
                    result = result.concat(tmp)
                }
            }
        } else if ((option.friendly !== "") && (option.type.length === 0)) {
            result = result.filter(key => (key.friendly === option.friendly))
        } else {
            return result;
        }
        return result;
    }

    const filterModal = <React.Fragment>
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
                                <p className="i18noption">{langData.foodType}</p>
                                <div>
                                    <button className="itemList3" onClick={sel_Food}>{langData.buffet}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.asia}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.western}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.india}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.nepal}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.japan}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.china}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.turkey}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.kor}</button>
                                    <button className="itemList3" onClick={sel_Food}>{langData.etc}</button>
                                    {/* 3개 이하: 말레이시아, 모로코, 아랍, 이집트, 중동식, 중식, 튀니지, 파키스탄, 프랑스, 우즈베키스탄 분류없음 */}
                                </div>
                                <p className="i18noption">{langData.standard}</p>
                                <div className="foodtype">
                                    <div>
                                        <button onClick={sel_Food}><img
                                            className="icon_halal"
                                            src={icon_halal_certified}
                                            alt="icon_halal_certified"/></button>
                                        <p>{langData.certified}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_Food}><img
                                            className="icon_halal"
                                            src={icon_muslim_friendly}
                                            alt="icon_muslim_friendly"/></button>
                                        <p>{langData.MusFriendly}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_Food}><img className="icon_halal" src={icon_pork_free} alt="icon_pork_free"/></button>
                                        <p>{langData.porkFree}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_Food}><img
                                            className="icon_halal"
                                            src={icon_self_certified}
                                            alt="icon_self_certified"/></button>
                                        <p>{langData.selfCerti}</p>
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

    // const changeList = (list(optionList)) Pagination
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts = (tmp) => {
        return tmp.slice(indexOfFirst, indexOfLast);
    }

    let numOfFirst = currentPage - 4;
    let numOfLast = currentPage + 4;

    let mainArr = filter
        ? list()
        : locList;

    let lastPage = parseInt(mainArr.length / 6) + 1;

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
            numOfFirst = currentPage - 8;
        }
    }

    return (
        <div>
            <img src={headerImg} className="headerImg" alt="Restraunt list"/>

            <div className="header2">
                <Link
                    to={{
                        pathname: `./search`,
                        state: {
                            moveTo: location.state.moveTo,
                            langData: langData,
                            i18n: i18n
                        }
                    }}>
                    <img className="backicon" src={backicon} alt="backicon"/></Link>

                <h1>{langData.restTitle}</h1>

                <div className="btn_class_M">
                    {filterModal}
                </div>
            </div>
            <div className="att_prom">
                <div className="prom_text_att">
                    <p className="name_att">가게명</p>
                    <div>
                        <p className="scorepos_att">가게 위치</p>
                        <img className="scorestar" src={scorestar} alt="scorestar"/>
                        <p className="score_att">N.N점</p>
                    </div>
                </div>
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
                    <h1>{langData.restTitle}</h1>
                </div>
                <div className="btn_class_att">
                    {filterModal}
                </div>
            </div>

            {
                (locList.length === 0)
                    ? <div className="errorMsg">
                            <img src={Notfound} className="notFound" alt="검색 결과가 존재하지 않습니다"/>
                            <div className="noRes">{langData.noRes}</div>
                        </div>
                    : <div>
                            <div className="list">
                                <Item
                                    rlist={filter
                                        ? currentPosts(list())
                                        : currentPosts(locList)}
                                    moveTo={location.state.moveTo}
                                    filType={option}
                                    code={code}
                                    langData={langData}
                                    i18n={i18n}></Item>
                            </div>
                            <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}/>
                        </div>
            }
        </div>
    )
}

export default Restaurant_list;