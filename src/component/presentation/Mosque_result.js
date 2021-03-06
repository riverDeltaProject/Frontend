import React, {useEffect, useRef} from 'react';
import {Link, useLocation} from "react-router-dom";

import backicon from "../assets/backicon.png";
import noImg from "../assets/noImg.png"

import {kakao, options} from '../API/kakao';

const Mosque_result = () => {
    const location = useLocation();
    const container = useRef(null);

    const about = location.state.data;
    const langData = location.state.langData;
    const i18n = location.state.i18n;

    useEffect(() => {
        const map = new window
            .kakao
            .maps
            .Map(container.current, options);

        const geocoder = new kakao
            .maps
            .services
            .Geocoder();

        let str = (i18n === "kr")
            ? about.address
            : about
                .address
                .match(/\((.*?)\)/)[1]
        
        geocoder.addressSearch(str, function (result, status) {

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

    return (
        <div className="resultContainer">
            <div className="resHeader">
                <Link
                    to={{
                        pathname: `/mosqlist`,
                        search: `?sort=mosque`,
                        state: {
                            deState: true,
                            optList: location.state.filType,
                            langData: location.state.langData,
                            i18n: i18n
                        }
                    }}>
                    <img className="backicon" src={backicon} alt="backicon"/></Link>
            </div>
            <div className="resultHeader">
                <h1>{about.name}</h1>
            </div>
            <div className="resultBody">
                <div className="infoContainer">
                    <div className="rst_result_prom" style={{backgroundImage:"url("+((
                                about.imgurl === undefined)
                                ? noImg
                                : about.imgurl)+")"}}>
                    </div>
                    <div className="rst_result_cell">
                        <div className="Title">
                            <div className="rst_result_name">{about.name}</div>
                            <div className="subInfo">{about.type}</div>
                        </div>
                        <div className="Items">
                            <div className="infoItem longItem">
                                <div>{langData.type}</div>
                                <div>{about.type}</div>
                            </div>
                            <div className="infoItem longItem">
                                <div>{langData.nation}</div>
                                <div>{about.nation}</div>
                            </div>
                            <div className="infoItem longItem">
                                <div>{langData.addr}</div>
                                <div>{about.address}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rst_result_cell">
                    <h1>{langData.way}</h1>
                    <div className='myMapMosque' ref={container}/>
                </div>
            </div>
        </div>
    );
};

export default Mosque_result;