import React, {useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";

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
import axios from 'axios';

const Attraction_list = () => {
    const history = useHistory();
    const location = useLocation();
    const [area, setArea] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [maindata, setMainData] = useState([]);
    const [postsPerPage] = useState(6);
    const [filter, setFilter] = useState(false);

    let moveTo = location.state.moveTo;
    const where = location.state.code;

    useEffect(() => {
        attList(where["areaCode"],where["cityCode"])
    })

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const setModal = () => {
        setFilter(true);
        setModalOpen(false);
    }

    let attList = async (areaCode, cityCode) => {
        const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${serviceKey}&contentTypeId=12&areaCode=${areaCode}&numOfRows=40&sigunguCode=${cityCode}&MobileOS=ETC&MobileApp=AppTest`;
        try {
            const {data: res} = await axios.get(url)
            const list = res.response.body.items.item;

            console.log("rendering!")
            setMainData(list);
        } catch (err) {
            console.log(err);
        }
    }

    const goSearch = () => {
        history.push({
            pathname: `./searchArea`,
            state: {
                moveTo: moveTo
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

    if (numOfFirst <= 0) {
        numOfFirst = 1;
        if (numOfLast < lastPage) {
            numOfLast = 9;
        } else {
            numOfLast = lastPage;
        }
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
                                                    <button><img className="icon_att" src={icon_att} alt="icon_att"/></button>
                                                    <p>관광지</p>
                                                </div>
                                                <div>
                                                    <button><img className="icon_att" src={icon_att_culture} alt="icon_att_culture"/></button>
                                                    <p>문화시설</p>
                                                </div>
                                                <div>
                                                    <button><img className="icon_att" src={icon_att_show} alt="icon_att_show"/></button>
                                                    <p>행사/공연</p>
                                                </div>
                                                <div>
                                                    <button><img className="icon_att" src={icon_att_leports} alt="icon_att_leports"/></button>
                                                    <p>레포츠</p>
                                                </div>
                                                <div>
                                                    <button><img className="icon_att" src={icon_att_stay} alt="icon_att_stay"/></button>
                                                    <p>숙박</p>
                                                </div>
                                                <div>
                                                    <button><img className="icon_att" src={icon_att_shop} alt="icon_att_shop"/></button>
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
            <Item rlist={currentPosts(maindata)} moveTo={moveTo} area={area} city={"강남"}></Item>

        </div>
    );
};

export default Attraction_list;