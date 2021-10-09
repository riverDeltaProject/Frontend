import React, {useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import Modal_Attraction from './Modal_Attraction.js';

import backicon from "../assets/backicon.png";
import scorestar from "../assets/scorestar.png";
import icon_filter from "../assets/icon_filter.png";
import icon_att from "../assets/icon_att.png";
import icon_att_show from "../assets/icon_att_show.png";
import icon_att_leports from "../assets/icon_att_leports.png";
import icon_att_culture from "../assets/icon_att_culture.png";
import icon_att_shop from "../assets/icon_att_shop.png";
import icon_att_stay from "../assets/icon_att_stay.png";
import {serviceKey} from '../API/Key';
import axios from 'axios';

const Attraction_list = () => {
    const history = useHistory();
    const location = useLocation();
    const [data, setData] = useState();
    const [area, setArea] = useState("");
    let moveTo = location.state.moveTo;
    let areaList = [];
    let areaCode = 1;

    useEffect(() => {
        const areaCode = 1;
        const cityCode = 1;
        const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${serviceKey}&contentTypeId=15&areaCode=${areaCode}&sigunguCode=${cityCode}&MobileOS=ETC&MobileApp=AppTest`;

        axios
            .get(url)
            .then((res) => {
                console.log(res.data.response)
                const areaCode = res.data.response.body.items.item;
                setData(areaCode);
            })
    })

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    // 뒤로 돌아가기 버튼
    const goSearch = () => {
        history.push({
            pathname: `./searchArea`,
            state: {
                moveTo: moveTo
            }
        })
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
                    <Modal_Attraction open={modalOpen} close={closeModal} header="테마">
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
                    </Modal_Attraction>
                </React.Fragment>
            </div>
        </div>
    );
};

export default Attraction_list;