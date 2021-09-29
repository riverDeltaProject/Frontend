import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Modal_Restaurant from './Modal_Restaurant.js';
import Item from './Restaurant_Item.js';

import backicon from "../assets/backicon.png";
import scorestar from "../assets/scorestar.png";
import icon_filter from "../assets/icon_filter.png"
import icon_halal_certified from "../assets/icon_halal_certified.png";
import icon_muslim_friendly from "../assets/icon_muslim_friendly.png";
import icon_pork_free from "../assets/icon_pork_free.png";
import icon_self_certified from "../assets/icon_self_certified.png";
import {restList} from "../API/rest"
import Pagination from './Pagination.js';


const Restaurant_list = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts = (tmp) => {
        return tmp.slice(indexOfFirst, indexOfLast);
    }

    let numOfFirst = currentPage - 4;
    let numOfLast = currentPage + 4;

    if(numOfFirst<=0){
      numOfFirst = 1;
      numOfLast = 9;
    }

    return (
        <div>
            <Link to="./restaurant"><img className="backicon" src={backicon} alt="backicon"/></Link>
            <h1 className="header2">식당</h1>
            <div className="restaurant_promotion">
                <div className="promotion_text">
                    <p className="name_restaurant">가게명</p>
                    <div>
                        <p className="scoreposition">가게 위치</p>
                        <img className="scorestar" src={scorestar} alt="scorestar"/>
                        <p className="score">N.N점</p>
                    </div>
                </div>
            </div>
            <div className="btn_class_list">
                <form action="search.php" method="post">
                    <input className="btn_text_list" type="text"/>
                    <input className="btn_submit_list" type="submit" value="SEARCH"/>
                </form>
                <React.Fragment>
                    <button className="button_filter" onClick={openModal}><img className="icon_filter" src={icon_filter} alt="icon_filter"/></button>
                    <Modal_Restaurant open={modalOpen} close={closeModal} header="필터">
                        <p className="langoption">음식 종류</p>
                        <div>
                            <button className="itemList2">뷔페</button>
                            <button className="itemList2">아시아</button>
                            <button className="itemList2">양식</button>
                            <button className="itemList2">인도</button>
                            <button className="itemList2">네팔</button>
                            <button className="itemList2">일식</button>
                            <button className="itemList2">중식</button>
                            <button className="itemList2">터키</button>
                            <button className="itemList2">한식</button>
                            <button className="itemList2">중식</button>
                            <button className="itemList2">그 외</button>
                            {/* 3개 이하: 말레이시아, 모로코, 아랍, 이집트, 중동식, 중식, 튀니지, 파키스탄, 프랑스, 우즈베키스탄 분류없음 */}
                        </div>
                        <p className="langoption">Halal Standard</p>
                        <div className="foodtype">
                            <div>
                                <button><img
                                    className="icon_halal"
                                    src={icon_halal_certified}
                                    alt="icon_halal_certified"/></button>
                                <p>인증됨</p>
                            </div>
                            <div>
                                <button><img
                                    className="icon_halal"
                                    src={icon_muslim_friendly}
                                    alt="icon_muslim_friendly"/></button>
                                <p>무슬림 친화</p>
                            </div>
                            <div>
                                <button><img className="icon_halal" src={icon_pork_free} alt="icon_pork_free"/></button>
                                <p>포크프리</p>
                            </div>
                            <div>
                                <button><img
                                    className="icon_halal"
                                    src={icon_self_certified}
                                    alt="icon_self_certified"/></button>
                                <p>자가인증</p>
                            </div>
                        </div>
                    </Modal_Restaurant>
                </React.Fragment>
            </div>
            <Item rlist={currentPosts(restList)}/>
            <Pagination
                postsPerPage={postsPerPage}
                start={numOfFirst}
                last={numOfLast}
                paginate={setCurrentPage}/>
        </div>
    );
};

export default Restaurant_list;