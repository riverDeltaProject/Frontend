import React, {useEffect, useRef, useState} from 'react';
import {useLocation, Link} from "react-router-dom";
import {restKor} from '../API/rest'
import {restEn} from '../API/restEn'
import Item from "./SubItem_rest"

import backicon from "../assets/backicon.png";
import Pagination from './Pagination';
import noImg from "../assets/noImg.png"

import {kakao, options} from '../API/kakao';

const Attraction_result = () => {
    const location = useLocation();
    const container = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const beforeState = location.state;

    const about = beforeState.data;
    const code = beforeState.code;
    const moveTo = beforeState.moveTo;
    const langData = beforeState.langData;

    useEffect(() => {
        const map = new window
            .kakao
            .maps
            .Map(container.current, options);

        // const geocoder = new kakao     .maps     .services     .Geocoder();4
        let coords = new kakao
            .maps
            .LatLng(about.mapy, about.mapx);
        // 결과값으로 받은 위치를 마커로 표시합니다
        let marker = new kakao
            .maps
            .Marker({map: map, position: coords});

        marker.setMap(map);
        map.setCenter(coords);

        return() => {};
    }, [])

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const tmpRest = (beforeState.i18n === "kr")
        ? restKor
        : restEn;

    const sugglist = () => {
        let tmp = tmpRest.filter(
            key => key.address.includes(code["city"]) && key.area.includes(code["area"])
        );

        if (tmp.length === 0) {
            tmp = tmpRest.filter(key => key.area.includes(code["area"]))
        }

        return tmp
    }

    const currentPosts = () => {
        return sugglist().slice(indexOfFirst, indexOfLast);
    }

    let numOfFirst = currentPage - 4;
    let numOfLast = currentPage + 4;

    let lastPage = parseInt(sugglist().length / 6) + 1;

    if (numOfFirst <= 0) {
        numOfFirst = 1;
        if (numOfLast < lastPage) {
            numOfLast = 9;
        } else {
            numOfLast = lastPage;
        }
    }

    const attType = () => {
        let type = ""
        switch (beforeState.filType) {
            case 14:
                type = "문화시설";
                break;
            case 15:
                type = "행사/공연/축제";
                break;
            case 25:
                type = "여행코스";
                break;
            case 28:
                type = "레포츠";
                break;
            case 32:
                type = "숙박";
                break;
            case 38:
                type = "쇼핑";
                break;
            case 78:
                type = "Cultural facility";
                break;
            case 85:
                type = "Festival";
                break;
            case 75:
                type = "Sports";
                break;
            case 80:
                type = "Lodgment";
                break;
            case 79:
                type = "Shopping";
                break;
            case 76:
                type = "Cultural facility";
                break;
            default:
                type = "관광지";
                break;
        }

        return type;
    }

    return (
        <div className="resultContainer">
            <div className="resHeader">
                <Link
                    to={{
                        pathname: `/attrlist`,
                        search: `?sort=${location
                            .state
                            .code["city"]}`,
                        state: {
                            code: code,
                            moveTo: moveTo,
                            deState: true,
                            langData: beforeState.langData,
                            i18n: beforeState.i18n,
                            optList: beforeState.filType
                        }
                    }}>
                    <img className="backicon" src={backicon} alt="backicon"/></Link>
            </div>
            <div className="resultHeader">
                <h1>{about.title}</h1>
            </div>
            <div className="resultBody">
                <div className="infoContainer">

                    <div className="rst_result_prom" style={{backgroundImage:"url("+((
                                about.firstimage === undefined)
                                ? noImg
                                : about.firstimage)+")"}}>
                    </div>
                    <div className="rst_result_cell">
                        <div className="Title">
                            <div className="rst_result_name">{about.title}</div>
                            <div className="subInfo">{attType()}</div>
                        </div>
                        <div className="Items">
                            <div className="infoItem longItem">
                                <div>{langData.addr}</div>
                                <div>{about.addr1}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rst_result_cell">
                    <h1>{langData.way}</h1>
                    <div className='myMapMosque' ref={container}/>
                </div>
                <div className="rst_result_cell">
                    <h1>{langData.nearbyRest}</h1>
                    <Item rlist={currentPosts()} code={code} lang={beforeState.lang}/>
                    <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}/>
                </div>
            </div>
        </div>
    );
};

export default Attraction_result;