import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";

import backicon from "../assets/backicon.png";
import scorestar from "../assets/scorestar.png";
import icon_filter from "../assets/icon_filter.png";
import icon_reset from "../assets/icon_reset.png";
import icon_att from "../assets/icon_att.png";
import icon_att_show from "../assets/icon_att_show.png";
import icon_att_leports from "../assets/icon_att_leports.png";
import icon_att_culture from "../assets/icon_att_culture.png";
import icon_att_shop from "../assets/icon_att_shop.png";
import icon_att_stay from "../assets/icon_att_stay.png";
import {serviceKey} from '../API/Key';
import Item from './Item_att.js';
import Pagination from './Pagination.js';
import axios from 'axios';

const Attraction_list = () => {
    const history = useHistory();
    const location = useLocation();

    let moveTo = location.state.moveTo;
    const where = location.state.code;
    const deState = location.state.deState;
    const optionList = location.state.optList;
    const lang = location.state.lang;

    const [currentPage, setCurrentPage] = useState(1);
    const [maindata, setMainData] = useState([]);
    const [postsPerPage] = useState(6);
    const [filter, setFilter] = useState(deState);
    const [option, setOption] = useState(optionList);

    useEffect(() => {
        attList(where["areaCode"], where["cityCode"], option)
    }, [])

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const setModal = () => {
        setFilter(true);
        attList(where["areaCode"], where["cityCode"], option)
        console.log(maindata)

        setModalOpen(false);
    }

    let attList = async (areaCode, cityCode, filType) => {
        let url = (lang === "KorService")
            ? `http://api.visitkorea.or.kr/openapi/service/rest/${lang}/areaBasedList?ServiceKey=${serviceKey}&contentTypeId=${filType}&areaCode=${areaCode}&numOfRows=40&sigunguCode=${cityCode}&MobileOS=ETC&MobileApp=AppTest`
            : null
        // 영어 서비스에서는 URL이 한국 서비스와 다름. 그런데 여기서 시군구를 구분한 결과값이 나오지 않음. 검색하는 쪽에서 시군구를 검색하지
        // 못한다는 제한으로는 가능할 듯

        try {
            const {data: res} = await axios.get(url)
            const list = res.response.body.items.item;

            console.log(res)

            setMainData(list);
        } catch (err) {
            console.log(err);
        }
    }

    const goSearch = () => {
        history.push({
            pathname: `./searchArea`,
            state: {
                moveTo: moveTo,
                filType: option
            }
        })
    }
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts = (tmp) => {
        return tmp.slice(indexOfFirst, indexOfLast);
    }

    let numOfFirst = currentPage - 4;
    let numOfLast = currentPage + 4;


    let lastPage = parseInt(maindata.length / 6) + 1;

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
    let attrType = 0;

    const sel_attr = (e) => {
        target = e.target.parentNode.nextSibling.innerText;

        switch (target) {
            case "문화시설":
                attrType = 14;
                break;
            case "행사/공연/축제":
                attrType = 15;
                break;
            case "레포츠":
                attrType = 28;
                break;
            case "숙박":
                attrType = 32;
                break;
            case "쇼핑":
                attrType = 38;
                break;
            default:
                attrType = 12;
                break;
        }

        setOption(attrType);
    }

    return (
        <div>
            <img className="backicon" src={backicon} alt="backicon" onClick={goSearch}/>
            <h1 className="header2">관광지</h1>
            <div className="att_prom">
                <div className="prom_text_att">
                    <p className="name_att">관광지명</p>
                    <div>
                        <p className="scorepos_att">관광지 위치</p>
                        <img className="scorestar" src={scorestar} alt="scorestar"/>
                        <p className="score_att">N.N점</p>
                    </div>
                </div>
            </div>
            <div className="btn_class_att">
                <form action="search.php" method="post">
                    <input className="btn_text_att" type="text"/>
                    <input className="btn_submit_att" type="submit" value="SEARCH"/>
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
                                            <img className="icon_reset" src={icon_reset} alt="icon_reset"/>
                                            <p className="header_modal_mosque">필터</p>
                                        </header>
                                        <main>
                                            <div className="atttype">
                                                <div>
                                                    <button onClick={sel_attr}><img className="icon_att" src={icon_att} alt="icon_att"/></button>
                                                    <p>관광지</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_attr}><img className="icon_att" src={icon_att_culture} alt="icon_att_culture"/></button>
                                                    <p>문화시설</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_attr}><img className="icon_att" src={icon_att_show} alt="icon_att_show"/></button>
                                                    <p>행사/공연/축제</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_attr}><img className="icon_att" src={icon_att_leports} alt="icon_att_leports"/></button>
                                                    <p>레포츠</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_attr}><img className="icon_att" src={icon_att_stay} alt="icon_att_stay"/></button>
                                                    <p>숙박</p>
                                                </div>
                                                <div>
                                                    <button onClick={sel_attr}><img className="icon_att" src={icon_att_shop} alt="icon_att_shop"/></button>
                                                    <p>쇼핑</p>
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
                rlist={currentPosts(maindata)}
                moveTo={moveTo}
                code={where}
                filType={option}
                lang={lang}></Item>
            <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}></Pagination>
        </div>
    );
};

export default Attraction_list;