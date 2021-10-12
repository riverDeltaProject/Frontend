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
import {restList} from "../API/rest"
import Pagination from './Pagination.js';

import Notfound from "../assets/notfound.png"

const Restaurant_list = () => {
    const history = useHistory();
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [area] = useState(location.state.area)
    const [city] = useState(location.state.city)
    const [optionList, setOption] = useState([])

    // 지역에 맞게 리스트 추려내기
    const locList = restList.filter(
        key => (key.address.includes(area) && key.address.includes(city))
    );

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setOption([])
        setModalOpen(false);
    }

    // const changeList = (list(optionList)) Pagination
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts = (tmp) => {
        return tmp.slice(indexOfFirst, indexOfLast);
    }

    let numOfFirst = currentPage - 4;
    let numOfLast = currentPage + 4;

    let lastPage = parseInt(locList.length / 6) + 1;

    if (numOfFirst <= 0) {
        numOfFirst = 1;
        if (numOfLast < lastPage) {
            numOfLast = 9;
        } else {
            numOfLast = lastPage;
        }
    }

    // 뒤로 돌아가기 버튼
    const goSearch = () => {
        history.push({
            pathname: `./searchArea`,
            state: {
                moveTo: location.state.moveTo
            }
        })
    }

    // 필터 후에 여러 개 추가 만들기
    let target;
    let foodList = [[], []];
    const sel_Food = (e) => {
        if (e.target.tagName === "BUTTON") {
            target = e.target.innerText;
            if (!foodList.includes(target))
                foodList[0].push(target)
        } else {
            target = e.target.parentNode.nextSibling.innerText;
            foodList[1] = target
        }

        setOption(foodList);
    }

    //필터에 선택한 항목대로 리스트 만들기
    const list = (foodList) => {
        let result = locList;

        if (foodList.length === 0) {
            return
        } else {
            // result = locList.filter(key => key.foodType.includes(foodList[0][0]))

            // if (foodList[1].length != 0) {
            //     console.log("Entered!")
            //     result = result.filter(key => key.friendly.includes(foodList[1]))
            // }
            result = result.filter(key => key.foodType.includes(foodList[0][0]))

            return result
        }
    }

    console.log(list(optionList))

    return (
        <div>
            <img className="backicon" src={backicon} alt="backicon" onClick={goSearch}/>
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
            {
                (locList.length === 0)
                    ? <div className="errorMsg">
                            <img src={Notfound} className="notFound"/>
                            <div className="noRes">검색 결과가 존재하지 않습니다.</div>
                        </div>
                    : <div>
                            <div className="btn_class_list">
                                <form action="search.php" method="post">
                                    <input className="btn_text_list" type="text"/>
                                    <input className="btn_submit_list" type="submit" value="SEARCH"/>
                                </form>
                                <React.Fragment>
                                    <button className="button_filter" onClick={openModal}><img className="icon_filter" src={icon_filter} alt="icon_filter"/></button>

                                    <div className={ modalOpen ? 'openModal modal' : 'modal' }>
                                    { modalOpen ? (
                                        <section>
                                            <header>
                                                <img className="icon_reset" src={icon_reset} alt="icon_reset" />
                                                <p className="header_modal_filter">필터</p>
                                            </header>
                                            <main>
                                                <p className="langoption">음식 종류</p>
                                                <div>
                                                <button className="itemList3" onClick={sel_Food}>뷔페</button>
                                                <button className="itemList3" onClick={sel_Food}>아시아</button>
                                                <button className="itemList3" onClick={sel_Food}>양식</button>
                                                <button className="itemList3" onClick={sel_Food}>인도</button>
                                                <button className="itemList3" onClick={sel_Food}>네팔</button>
                                                <button className="itemList3" onClick={sel_Food}>일식</button>
                                                <button className="itemList3" onClick={sel_Food}>중식</button>
                                                <button className="itemList3" onClick={sel_Food}>터키</button>
                                                <button className="itemList3" onClick={sel_Food}>한식</button>
                                                <button className="itemList3" onClick={sel_Food}>그 외</button>
                                                {/* 3개 이하: 말레이시아, 모로코, 아랍, 이집트, 중동식, 중식, 튀니지, 파키스탄, 프랑스, 우즈베키스탄 분류없음 */}
                                                </div>
                                                <p className="langoption">Halal Standard</p>
                                                <div className="foodtype">
                                                    <div>
                                                        <button onClick={sel_Food}><img
                                                        className="icon_halal"
                                                        src={icon_halal_certified}
                                                        alt="icon_halal_certified"/></button>
                                                        <p>할랄 공식 인증</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={sel_Food}><img
                                                        className="icon_halal"
                                                        src={icon_muslim_friendly}
                                                        alt="icon_muslim_friendly"/></button>
                                                        <p>무슬림 프렌들리</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={sel_Food}><img className="icon_halal" src={icon_pork_free} alt="icon_pork_free"/></button>
                                                        <p>포크프리</p>
                                                    </div>
                                                <div>
                                                        <button onClick={sel_Food}><img
                                                            className="icon_halal"
                                                            src={icon_self_certified}
                                                            alt="icon_self_certified"/></button>
                                                        <p>무슬림 자가 인증</p>
                                                    </div>
                                                </div>
                                            </main>
                                            <footer className="footer_modal_filter">
                                                <button className="close" onClick={closeModal}> 취소 </button>
                                                <button className="close" onClick={closeModal}> 적용 </button>
                                            </footer>
                                        </section>
                                    ) : null }
                                    </div>
                                </React.Fragment>
                            </div>
                            <Item rlist={currentPosts(locList)} moveTo="restaurant" area={area} city={city}></Item>
                            <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}></Pagination>
                        </div>
            }
        </div>
    )
}

export default Restaurant_list;