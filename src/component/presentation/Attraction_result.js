import React, {useEffect, useRef} from 'react';
import {useLocation, useHistory} from "react-router-dom";

import backicon from "../assets/backicon.png";

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

    const beforeState = location.state;

    const about = beforeState.data;
    const code = beforeState.code;
    const moveTo = beforeState.moveTo;

    console.log(about)

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


    const goBack = () => {
        history.push({
            pathname: `/Attraction_list`,
            search: `?sort=${location
                .state
                .code["city"]}`,
            state: {
                code: code,
                moveTo: moveTo
            }
        })
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
        </div>
    );
};

export default Attraction_result;