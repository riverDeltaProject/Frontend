import axios from 'axios';
import React, {useEffect, useRef} from 'react';
import {Link, useLocation, useHistory} from "react-router-dom";
import {kakaoKey} from '../API/Key';

import backicon from "../assets/backicon.png";
import noImg from "../assets/noImg.png"


const {kakao} = window;
const options = {
    center: new window
        .kakao
        .maps
        .LatLng(33.450701, 126.570667),
    level: 3
}

const Mosque_result = () => {
    const history = useHistory();
    const location = useLocation();
    const container = useRef(null);

    const about = location.state.data;

    const tmp = (location.state.lang === "KorService")
    ? [
        "국적",
        "주소",
        "오시는 길",
        "유형"
    ]
    : [
        "Nation",
        "Address",
        "Way to Come",
        "type"
    ];

    useEffect(() => {
        const map = new window
            .kakao
            .maps
            .Map(container.current, options);

        const geocoder = new kakao
            .maps
            .services
            .Geocoder();

        geocoder.addressSearch(about.address, function (result, status) {

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

    const goBack = ()=>{
        history.push({
            pathname:`/mosque_list`,
            search:`?sort=mosque`,
            state:{
                deState : true,
                optList : location.state.filType,
                lang : location.state.lang
            }
        })
    }

    return (
        <div className="resultContainer">
            <img className="backicon" src={backicon} alt="backicon" onClick={goBack}/>
            <div className="resultHeader">
                <h1>{about.name}</h1>
            </div>
            <div className="resultBody">
                <div className="infoContainer">
                    <img
                        className="rst_result_prom"
                        src={(
                            about.imgurl === undefined)
                            ? noImg
                            : about.imgurl}
                        alt={about.title}></img>
                    <div className="rst_result_cell">
                        <div className="Title">
                            <div className="rst_result_name">{about.name}</div>
                            <div className="subInfo">{about.type}</div>
                        </div>
                        <div className="Items">
                            <div className="infoItem longItem">
                                <div>{tmp[3]}</div>
                                <div>{about.type}</div>
                            </div>
                            <div className="infoItem longItem">
                                <div>{tmp[0]}</div>
                                <div>{about.nation}</div>
                            </div>
                            <div className="infoItem longItem">
                                <div>{tmp[1]}</div>
                                <div>{about.address}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rst_result_cell">
                    <h1>{tmp[2]}</h1>
                    <div className='myMapMosque' ref={container}/>
                </div>
            </div>
        </div>
    );
};

export default Mosque_result;