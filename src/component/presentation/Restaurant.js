import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import SubArea from './SubArea';

import backicon from "../assets/backicon.png";

const Restaurant = () => {
    const [data, setData] = useState();
    const serviceKey = "GNiCxJ1fY0ZfoZUxoHREWXQNKaQYT9g8t4nGfr%2FvfkA6A5msj3bQfRLVZFgQlhftS1wt9Hh6yJJ%2FH%2FeP%2BxMHpw%3D%3D"; // 서비스키 입력
    let areaList = [];

    const api = (code) => {
        const areaCode = code;
        const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=${serviceKey}&areaCode=${areaCode}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest`;

        axios
            .get(url)
            .then((res) => {
                console.log("SUCCESS");
                const areaCode = res.data.response.body.items.item;
                // areaCode는 즉각적인 반응이 잘 일어나는 데 비해 useState를 이용한 data는 항상 한발짝 느리다. 왜 그럴까? 이번
                // 렌더링에서 setData로 값을 설정하고, 그 다음 렌더링에서 해당 값이 반영되기 때문

                setData(areaCode);
                subArea(areaCode);
            })
    }

    const subArea = (areaCode) => {
        let length = 10;

        for (let key in areaCode){
          areaList.push(areaCode[key].name)
        }

        return areaList;
    }

    return (
        <div>
            <Link to="./"><img className="backicon" src={backicon} alt="backicon"/></Link>
            <h1 className="header2">위치설정</h1>
            <p className="normalfont">찾고 싶은 위치 및 장소를 입력하세요</p>
            <div className="btn_class">
                <form action="search.php" method="post">
                    <input className="btn_text" type="text"/>
                    <input className="btn_submit" type="submit" value="SEARCH"/>
                </form>
            </div>
            <p className="findingplace">광역시</p>
            <div className="containerList">
                <button
                    className="itemList"
                    onClick={() => {
                        api(1)
                    }}>서울시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(2)
                    }}>인천시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(3)
                    }}>대전시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(4)
                    }}>대구시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(5)
                    }}>광주시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(6)
                    }}>부산시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(39)
                    }}>제주시</button>
            </div>
            <p className="findingplace">시/군/구</p>
            <div className="containerList2">
                <SubArea
                  citylist = {subArea(data)}
                />
            </div>
        </div>
    );
};

export default Restaurant;