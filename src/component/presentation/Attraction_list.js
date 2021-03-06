import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

import backicon from "../assets/backicon.png";
import icon_filter from "../assets/icon_filter.png";
import icon_reset from "../assets/icon_reset.png";
import icon_att from "../assets/icon_att.png";
import icon_att_show from "../assets/icon_att_show.png";
import icon_att_leports from "../assets/icon_att_leports.png";
import icon_att_culture from "../assets/icon_att_culture.png";
import icon_att_shop from "../assets/icon_att_shop.png";
import icon_att_stay from "../assets/icon_att_stay.png";
import headerImg from "../assets/att_header.JPG"
import Notfound from "../assets/notfound.png"
import homeIcon from "../assets/homeIcon.png"

import {serviceKey} from '../API/Key';
import Item from './Item_att.js';
import Pagination from './Pagination.js';
import axios from 'axios';

const Attraction_list = () => {
    const location = useLocation();

    let moveTo = location.state.moveTo;
    const where = location.state.code;
    const deState = location.state.deState;
    const optionList = location.state.optList;
    const langData = location.state.langData;
    const i18n = location.state.i18n;

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

        setModalOpen(false);
    }

    let attList = async (areaCode, cityCode, filType) => {
        let lang = (i18n === 'kr')
            ? "KorService"
            : "EngService";

        if((areaCode === 39)&&(lang==="EngService")){
            cityCode += 2;
        }

        let url = `http://api.visitkorea.or.kr/openapi/service/rest/${lang}/areaBasedList?ServiceKey=${serviceKey}&contentTypeId=${filType}&areaCode=${areaCode}&numOfRows=40&sigunguCode=${cityCode}&MobileOS=ETC&MobileApp=AppTest`
        // ?????? ?????????????????? URL??? ?????? ???????????? ??????. ????????? ????????? ???????????? ????????? ???????????? ????????? ??????. ???????????? ????????? ???????????? ????????????
        // ???????????? ??????????????? ????????? ???

        try {
            const {data: res} = await axios.get(url)
            const list = res.response.body.items.item;
            setMainData(list);
        } catch (err) {
            console.log(err);
        }
    }

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts = (tmp) => {
        if (tmp === undefined) {
            return []
        } else if (Object.keys(tmp)[0] !== "0") {
            return tmp
        } else {
            return tmp.slice(indexOfFirst, indexOfLast);
        }
    }

    let numOfFirst = currentPage - 4;
    let numOfLast = currentPage + 4;

    let lastPage = (maindata === undefined)
        ? 0
        : parseInt(maindata.length / 6) + 1;

    if (maindata === undefined) { //???????????? ?????? ?????? ??????
        numOfFirst = null
        numOfLast = null
    } else if (Object.keys(maindata)[0] === "0") { //???????????? 1??? ????????? ??????
        if (numOfFirst <= 0) { //numOfFirst??? 1 ????????? ???????????? ?????????
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
    } else { //???????????? 1?????? ??????
        numOfFirst = 1
        numOfLast = 1
    }

    let random;
    
    if(maindata !== undefined){
        random = maindata[Math.floor(Math.random() * maindata.length)];
    }


    // ??????
    let target;
    let attrType = 0;

    const sel_attr = (e) => {
        target = e.target.parentNode.nextSibling.innerText;

        if (i18n === 'kr') {
            switch (target) {
                case "????????????":
                    attrType = 14;
                    break;
                case "??????/??????/??????":
                    attrType = 15;
                    break;
                case "?????????":
                    attrType = 28;
                    break;
                case "??????":
                    attrType = 32;
                    break;
                case "??????":
                    attrType = 38;
                    break;
                default:
                    attrType = 12;
                    break;
            }
        } else {
            switch (target) {
                case "Cultural facility":
                    attrType = 78;
                    break;
                case "Festival":
                    attrType = 85;
                    break;
                case "Sports":
                    attrType = 75;
                    break;
                case "Lodgment":
                    attrType = 80;
                    break;
                case "Shopping":
                    attrType = 79;
                    break;
                default:
                    attrType = 76;
                    break;
            }
        }

        setOption(attrType);
    }

    const attrFilter = <React.Fragment>
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
                                <p className="header_modal_mosque">{langData.filter}</p>
                            </header>
                            <main>
                                <div className="atttype">
                                    <div>
                                        <button onClick={sel_attr}><img className="icon_att" src={icon_att} alt="icon_att"/></button>
                                        <p>{langData.attraction}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_attr}><img className="icon_att" src={icon_att_culture} alt="icon_att_culture"/></button>
                                        <p>{langData.cultFaci}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_attr}><img className="icon_att" src={icon_att_show} alt="icon_att_show"/></button>
                                        <p>{langData.fest}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_attr}><img className="icon_att" src={icon_att_leports} alt="icon_att_leports"/></button>
                                        <p>{langData.sports}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_attr}><img className="icon_att" src={icon_att_stay} alt="icon_att_stay"/></button>
                                        <p>{langData.lodg}</p>
                                    </div>
                                    <div>
                                        <button onClick={sel_attr}><img className="icon_att" src={icon_att_shop} alt="icon_att_shop"/></button>
                                        <p>{langData.shopping}</p>
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
            <img src={headerImg} className="headerImg" alt="Attraction list"/>
            <div className="header2">
                <Link
                    to={{
                        pathname: `./search`,
                        state: {
                            moveTo: moveTo,
                            langData: langData,
                            i18n: i18n
                        }
                    }}>
                    <img className="backicon" src={backicon} alt="backicon"/></Link>
                <h1>{langData.attrTitle}</h1>
                <div className="btn_class_M">{attrFilter}</div>
            </div>
            {
                (Object.keys(currentPosts(maindata))[0] !== "0")
                    ? null
                    : <div className="att_prom" style={{backgroundImage:"url("+random.firstimage+")"}}>
                            <div className="prom_text_att">
                                <h3>{langData.suggAttr}</h3>
                                <p className="name_att">{random.title}</p>
                            <p className="scorepos_att">{random.addr1}</p>
                            </div>
                        </div>
            }
            <div className="header_list">
                <div className="headerTitle">
                    <Link
                        to={{
                            pathname: "/",
                            state: {
                                langData: langData,
                                i18n: i18n
                            }
                        }}>
                        <img src={homeIcon} alt={homeIcon}/></Link>
                    <h1>{langData.attrTitle}</h1>
                </div>
                <div className="btn_class_att">
                    {attrFilter}
                </div>
            </div>
            {
                (currentPosts(maindata) === undefined)
                    ? <div className="errorMsg">
                            <img src={Notfound} className="notFound" alt="?????? ????????? ???????????? ????????????"/>
                            <div className="noRes">{langData.noRes}</div>
                        </div>
                    : <div>
                            <div className="list">
                                <Item
                                    rlist={currentPosts(maindata)}
                                    moveTo={moveTo}
                                    code={where}
                                    filType={option}
                                    langData={langData}
                                    i18n={i18n}></Item>
                            </div>

                            <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}></Pagination>
                        </div>
            }
        </div>
    );
};

export default Attraction_list;