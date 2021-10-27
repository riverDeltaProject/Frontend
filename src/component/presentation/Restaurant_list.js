import React, {useState} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import Item from './Item.js';
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
    const history = useHistory();
    const location = useLocation();
    const where = location.state.code;
    const deState = location.state.deState;
    const optionList = location.state.optList;
    const lang = location.state.lang;

    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [option, setOption] = useState(optionList);
    const [filter, setFilter] = useState(deState);

    const tmp = (lang === "KorService")
        ? [
            "식당",
            "검색 결과가 존재하지 않습니다",
            "필터",
            "음식 종류",
            "뷔페",
            "아시아",
            "양식",
            "인도",
            "네팔",
            "일식",
            "중식",
            "터키",
            "한식",
            "그 외",
            "할랄 유형",
            "할랄 공식 인증",
            "무슬림 프렌들리",
            "포크프리",
            "무슬림 자가 인증",
            "취소",
            "적용"
        ]
        : [
            "Restaurant",
            "No Result",
            "Filter",
            "Food Type",
            "Buffet",
            "Asia",
            "Western Food",
            "India",
            "Nepal",
            "Japan",
            "China",
            "Turkey",
            "Korea",
            "Etc",
            "Halal Standard",
            "Halal Certified",
            "Muslim Friendly",
            "Pork Free",
            "Self Certified",
            "Cancel",
            "Apply"
        ];

    // 지역에 맞게 리스트 추려내기
    let locList = (lang === "KorService")
        ? restKor.filter(
            key => (key.address.includes(where["area"]) && key.address.includes(where["city"]))
        )
        : restEn.filter(
            key => (key.address.includes(where["area"]) && key.address.includes(where["city"]))
        );

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
                if (i === 0) 
                    result = result.filter(key => key.foodType.includes(option.type[i]))
                else {
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
    
    if (lastPage === currentPage){
        if((numOfFirst-8)<=0){
            numOfFirst = 1;
        } else{
            numOfFirst = currentPage-8
        }
    }

    // 뒤로 돌아가기 버튼
    const goSearch = () => {
        history.push({
            pathname: `./searchArea`,
            state: {
                moveTo: location.state.moveTo,
                lang: lang
            }
        })
    }

    const goBack = () => {
        history.push({
            pathname: `/`,
            search: ``,
            state: {
                lang: location.state.lang
            }
        })
    }

    return (
        <div>
            <img src={headerImg} className="headerImg" alt="Restraunt list"/>

            <div className="header2">
                <img className="backicon" src={backicon} alt="backicon" onClick={goSearch}/>

                <h1>{tmp[0]}</h1>

                <div className="btn_class_M">
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
                                                <p className="header_modal_mosque">{tmp[2]}</p>
                                            </header>
                                            <main>
                                                <p className="langoption">{tmp[3]}</p>
                                                <div>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[4]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[5]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[6]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[7]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[8]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[9]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[10]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[11]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[12]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[13]}</button>
                                                    {/* 3개 이하: 말레이시아, 모로코, 아랍, 이집트, 중동식, 중식, 튀니지, 파키스탄, 프랑스, 우즈베키스탄 분류없음 */}
                                                </div>
                                                <p className="langoption">{tmp[14]}</p>
                                                <div className="foodtype">
                                                    <div>
                                                        <button onClick={sel_Food}><img
                                                            className="icon_halal"
                                                            src={icon_halal_certified}
                                                            alt="icon_halal_certified"/></button>
                                                        <p>{tmp[15]}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={sel_Food}><img
                                                            className="icon_halal"
                                                            src={icon_muslim_friendly}
                                                            alt="icon_muslim_friendly"/></button>
                                                        <p>{tmp[16]}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={sel_Food}><img className="icon_halal" src={icon_pork_free} alt="icon_pork_free"/></button>
                                                        <p>{tmp[17]}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={sel_Food}><img
                                                            className="icon_halal"
                                                            src={icon_self_certified}
                                                            alt="icon_self_certified"/></button>
                                                        <p>{tmp[18]}</p>
                                                    </div>
                                                </div>
                                            </main>
                                            <footer className="footer_modal_mosque">
                                                <button className="close" onClick={closeModal}>
                                                    {tmp[19]}
                                                </button>
                                                <button className="close" onClick={setModal}>
                                                    {tmp[20]}
                                                </button>
                                            </footer>
                                        </section>
                                    )
                                    : null
                            }
                        </div>
                    </React.Fragment>
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
                    <img src={homeIcon} alt={homeIcon} onClick={goBack}/>
                    <h1>{tmp[0]}</h1>
                </div>
                <div className="btn_class_att">
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
                                                <p className="header_modal_mosque">{tmp[2]}</p>
                                            </header>
                                            <main>
                                                <p className="langoption">{tmp[3]}</p>
                                                <div>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[4]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[5]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[6]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[7]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[8]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[9]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[10]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[11]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[12]}</button>
                                                    <button className="itemList3" onClick={sel_Food}>{tmp[13]}</button>
                                                    {/* 3개 이하: 말레이시아, 모로코, 아랍, 이집트, 중동식, 중식, 튀니지, 파키스탄, 프랑스, 우즈베키스탄 분류없음 */}
                                                </div>
                                                <p className="langoption">{tmp[14]}</p>
                                                <div className="foodtype">
                                                    <div>
                                                        <button onClick={sel_Food}><img
                                                            className="icon_halal"
                                                            src={icon_halal_certified}
                                                            alt="icon_halal_certified"/></button>
                                                        <p>{tmp[15]}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={sel_Food}><img
                                                            className="icon_halal"
                                                            src={icon_muslim_friendly}
                                                            alt="icon_muslim_friendly"/></button>
                                                        <p>{tmp[16]}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={sel_Food}><img className="icon_halal" src={icon_pork_free} alt="icon_pork_free"/></button>
                                                        <p>{tmp[17]}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={sel_Food}><img
                                                            className="icon_halal"
                                                            src={icon_self_certified}
                                                            alt="icon_self_certified"/></button>
                                                        <p>{tmp[18]}</p>
                                                    </div>
                                                </div>
                                            </main>
                                            <footer className="footer_modal_mosque">
                                                <button className="close" onClick={closeModal}>
                                                    {tmp[19]}
                                                </button>
                                                <button className="close" onClick={setModal}>
                                                    {tmp[20]}
                                                </button>
                                            </footer>
                                        </section>
                                    )
                                    : null
                            }
                        </div>
                    </React.Fragment>
                </div>
            </div>

            {
                (locList.length === 0)
                    ? <div className="errorMsg">
                            <img src={Notfound} className="notFound" alt="검색 결과가 존재하지 않습니다"/>
                            <div className="noRes">{tmp[1]}</div>
                        </div>
                    : <div>
                            <div className="list">
                                <Item
                                    rlist={filter
                                        ? currentPosts(list())
                                        : currentPosts(locList)}
                                    moveTo="restaurant"
                                    filType={option}
                                    code={where}
                                    lang={lang}></Item>
                            </div>
                            <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}/>
                        </div>
            }
        </div>
    )
}

export default Restaurant_list;