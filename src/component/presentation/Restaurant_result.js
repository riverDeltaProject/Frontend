import React, {useEffect, useRef} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import Item from "./SubItem_att"

import backicon from "../assets/backicon.png";

const {kakao} = window;
const options = {
    center: new window
        .kakao
        .maps
        .LatLng(33.450701, 126.570667),
    level: 7
}

const Restaurant_result = () => {
    const history = useHistory();
    const location = useLocation();
    const container = useRef(null);

    const beforeState = location.state;

    const about = beforeState.data;
    const code = beforeState.code;
    const moveTo = beforeState.moveTo;
    const lang = beforeState.lang;

    const tmp = (lang === "KorService")
        ? [
            "전화번호",
            "휴무일",
            "운영시간",
            "주소",
            "할랄 여부",
            "주차",
            "오시는 길",
            "지도를 확대하거나 축소해보세요.",
            "주변 관광지의 위치가 노란 별로 표시됩니다.",
            "주변 관광지"

        ]
        : [
            "Phonenum",
            "Holiday",
            "Runtime",
            "Address",
            "Halal Friendly",
            "Parking",
            "Way to Come",
            "Zoom in or zoom out on the map.",
            "The location of nearby tourist attractions is indicated by a yellow star.",
            "Nearby Attractions"
        ];

        
        const attLoc = about
            .attAddress
            .split(",");

        const attName = about
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

        let str = (lang === "KorService")
            ? about.address
            : about
                .address
                .match(/\((.*?)\)/)[1]

        // 주변 관광지 표시

        const imageSize = new kakao
            .maps
            .Size(24, 35);

        let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
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

    const goBack = () => {
        history.push({
            pathname: `/restaurant_list`,
            search: `?sort=${location
                .state
                .code["city"]}`,
            state: {
                code: code,
                moveTo: moveTo,
                deState: true,
                optList: beforeState.filType,
                lang: lang
            }
        })
    }

    return (
        <div>
            <img className="backicon" src={backicon} alt="backicon" onClick={goBack}/>
            <div className="rst_result_prom"/>
            <div className="rst_result_cell">
                <div>
                    <div className="Title">
                        <div className="rst_result_name">{about.name}</div>
                        <div className="subInfo">{about.foodType}</div>
                    </div>
                    <div className="Items">
                        <div className="infoItem">
                            <div>{tmp[0]}</div>
                            <div>{about.phonenum}</div>
                        </div>
                        <div className="infoItem">
                            <div>{tmp[1]}</div>
                            <div>{about.holiday}</div>
                        </div>
                        <div className="infoItem">
                            <div>{tmp[2]}</div>
                            <div>{about.runtime}</div>
                        </div>
                        <div className="infoItem longItem">
                            <div>{tmp[3]}</div>
                            <div>{about.address}</div>
                        </div>
                        <div className="infoItem">
                            <div>{tmp[4]}</div>
                            <div>{about.friendly}</div>
                        </div>
                        <div className="infoItem">
                            <div>{tmp[5]}</div>
                            <div>{about.parking}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rst_result_cell">
                <h1>{tmp[6]}</h1>
                <div className='myMapMosque' ref={container}/>
                <p>{tmp[7]}</p>
                <p>{tmp[8]}</p>
            </div>
            <div className="rst_result_cell">
                <h1>{tmp[9]}</h1>
                <Item rlistName={attName} rlistAddress={attLoc} lang={lang}/>
            </div>
        </div>
    );
};

export default Restaurant_result;