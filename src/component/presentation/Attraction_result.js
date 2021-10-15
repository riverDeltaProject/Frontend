import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import {restList} from '../API/rest'
import Item from "./SubItem"

import backicon from "../assets/backicon.png";
import Pagination from './Pagination';

const {kakao} = window;
const options = {
    center: new window
        .kakao
        .maps
        .LatLng(33.450701, 126.570667),
    level: 3
}

const Attraction_result = () => {
    const history = useHistory();
    const location = useLocation();
    const container = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [restaurant, setRestaurant] = useState([]);
    const [postsPerPage] = useState(6);
    const beforeState = location.state;

    const about = beforeState.data;
    const code = beforeState.code;
    const moveTo = beforeState.moveTo;

    useEffect(() => {
        const map = new window
            .kakao
            .maps
            .Map(container.current, options);

        const geocoder = new kakao
            .maps
            .services
            .Geocoder();

        geocoder.addressSearch(about.addr1, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {

                let coords = new kakao
                    .maps
                    .LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                let marker = new kakao
                    .maps
                    .Marker({map: map, position: coords});

                marker.setMap(map);
                map.setCenter(coords);
            }
        })

        return() => {};
    }, [])

    //돌아가기
    const goBack = () => {
        history.push({
            pathname: `/Attraction_list`,
            search: `?sort=${location
                .state
                .code["city"]}`,
            state: {
                code: code,
                moveTo: moveTo,
                deState : true,
                optList : beforeState.filType
            }
        })
    }

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const sugglist = () => {
        let tmp = restList.filter(
            key => key.address.includes(code["city"]) && key.area.includes(code["area"])
        );

        if(tmp.length === 0){
            tmp = restList.filter(key => key.area.includes(code["area"]))
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

    return (
        <div>
            <img className="backicon" src={backicon} alt="backicon" onClick={goBack}/>
            <img className="rst_result_prom" src={about.firstimage} alt={about.title}></img>
            <div className="rst_result_cell">
                <div>
                    <div className="Title">
                        <div className="rst_result_name">{about.title}</div>
                        <div className="subInfo">{about.foodType}</div>
                    </div>
                    <div className="Items">
                        <div className="infoItem longItem">
                            <div>주소</div>
                            <div>{about.addr1}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rst_result_cell">
                <h1>오시는 길</h1>
                <div className='myMapMosque' ref={container}/>
            </div>
            <div className="rst_result_cell">
                <h1>주변 식당</h1>
                <Item rlist={currentPosts()} code={code}/>
                <Pagination start={numOfFirst} last={numOfLast} paginate={setCurrentPage}/>
            </div>
        </div>
    );
};

export default Attraction_result;