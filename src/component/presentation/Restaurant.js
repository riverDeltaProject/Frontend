import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import SubArea from './SubArea';
import {serviceKey} from '../API/Key';

import backicon from "../assets/backicon.png";

const Restaurant = () => {
    const [data, setData] = useState();
    const [area, setArea] = useState("");
    let areaList = [];

    const api = (code) => {
        const areaCode = code;
        const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=${serviceKey}&areaCode=${areaCode}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest`;

        axios
            .get(url)
            .then((res) => {
                const areaCode = res.data.response.body.items.item;
                // areaCode는 즉각적인 반응이 잘 일어나는 데 비해 useState를 이용한 data는 항상 한발짝 느리다. 왜 그럴까? 이번
                // 렌더링에서 setData로 값을 설정하고, 그 다음 렌더링에서 해당 값이 반영되기 때문

                setData(areaCode);
                subArea(areaCode);
            })
    }

    const subArea = (areaCode) => {
        let length = 10;

        for (let key in areaCode) {
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
                        api(1);
                        setArea("서울");
                    }}>서울시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(2);
                        setArea("인천");
                    }}>인천시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(3);
                        setArea("대전");
                    }}>대전시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(4);
                        setArea("대구");
                    }}>대구시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(5);
                        setArea("광주");
                    }}>광주시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(6);
                        setArea("부산");
                    }}>부산시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(39);
                        setArea("제주");
                    }}>제주시</button>
            </div>
            <p className="findingplace">시/군/구</p>
            <div className="containerList2">
                <SubArea citylist={subArea(data)} area={area}/>
            </div>
        </div>
    );
};

export default Restaurant;