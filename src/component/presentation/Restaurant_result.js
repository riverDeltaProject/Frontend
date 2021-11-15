import React, {useEffect, useRef} from 'react';
import {useLocation, Link} from "react-router-dom";
import Item from "./SubItem_att"

import backicon from "../assets/backicon.png";
import Notfound from "../assets/notfound.png"

import {kakao, options} from '../API/kakao';

const Restaurant_result = () => {
    const location = useLocation();
    const container = useRef(null);

    const beforeState = location.state;

    const about = beforeState.data;
    const code = beforeState.code;
    const moveTo = beforeState.moveTo;
    const langData = beforeState.langData;
    const i18n = beforeState.i18n;

    const attLoc = (about.attAddress === undefined)
        ? null
        : about
            .attAddress
            .split(",");

    const attName = (about.attAddress === undefined)
        ? null
        : about
            .attName
            .split(",");

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

        // 주변 관광지 표시

        const imageSize = new kakao
            .maps
            .Size(24, 35);

        let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        if (attLoc !== null) {
            for (let i = 0; i < attLoc.length; i++) {
                let markerImg = new kakao
                    .maps
                    .MarkerImage(imageSrc, imageSize);

                //마커 내용 표시
                let iwContent = `<div style="padding:5px; font-weight:bolder; font-size:13px;"> ${attName[i]} </div>`;
                let iwRemoveable = true;

                let infoWin = new
                kakao
                    .maps
                    .InfoWindow({content: iwContent, removable: iwRemoveable});

                geocoder.addressSearch(attLoc[i], function (result, status) {
                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        let coords = new kakao
                            .maps
                            .LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        let marker = new kakao
                            .maps
                            .Marker({map: map, position: coords, title: attName[i], image: markerImg});

                        marker.setMap(map);
                        kakao
                            .maps
                            .event
                            .addListener(marker, 'click', () => {
                                infoWin.open(map, marker)
                            })

                    }
                })
            }
        }

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
                        pathname: `/restlist`,
                        search: `?sort=${location
                            .state
                            .code["city"]}`,
                        state: {
                            code: code,
                            moveTo: moveTo,
                            deState: true,
                            optList: beforeState.filType,
                            i18n : i18n,
                            langData: langData
                        }
                    }}>
                    <img className="backicon" src={backicon} alt="backicon"/>
                </Link>
            </div>
            <div className="resultHeader">
                <h1>{about.name}</h1>
            </div>
            <div className="resultBody">
                <div className="infoContainer">
                    <div className="rst_result_cell">
                        <div className="Title_PC">
                            <div className="rst_result_name">{about.title}</div>
                            <div className="subInfo">{about.foodType}</div>
                        </div>
                        <div className="rst_result_cell">
                            <div>
                                <div className="Title">
                                    <div className="rst_result_name">{about.name}</div>
                                    <div className="subInfo">{about.foodType}</div>
                                </div>
                                <div className="Items">
                                    <div className="infoItem">
                                        <div>{langData.phone}</div>
                                        <div>{about.phonenum}</div>
                                    </div>
                                    <div className="infoItem">
                                        <div>{langData.holiday}</div>
                                        <div>{about.holiday}</div>
                                    </div>
                                    <div className="infoItem">
                                        <div>{langData.runtime}</div>
                                        <div>{about.runtime}</div>
                                    </div>
                                    <div className="infoItem longItem">
                                        <div>{langData.addr}</div>
                                        <div>{about.address}</div>
                                    </div>
                                    <div className="infoItem">
                                        <div>{langData.standard}</div>
                                        <div>{about.friendly}</div>
                                    </div>
                                    <div className="infoItem">
                                        <div>{langData.parking}</div>
                                        <div>{about.parking}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rstBottom">
                    <div className="rst_result_cell">
                        <h1>{langData.way}</h1>
                        <div className='myMapMosque' ref={container}/>
                        <div className="normalfont">{langData.zoom}<br/>{langData.zoomLoc}</div>
                    </div>
                    <div className="rst_result_cell">
                        <h1>{langData.nearAttr}</h1>
                        {
                            (about.attAddress === undefined)
                                ? <div className="errorMsg">
                                        <img src={Notfound} className="notFound" alt="검색 결과가 존재하지 않습니다"/>
                                        <div className="noRes">{langData.noRes}</div>
                                    </div>
                                : <Item rlistName={attName} rlistAddress={attLoc} langData={langData}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restaurant_result