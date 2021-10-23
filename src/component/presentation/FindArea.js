import React, {useEffect, useState} from 'react';
import {Link, useLocation, useHistory} from "react-router-dom";
import axios from 'axios';
import SubArea from './SubArea';
import {serviceKey} from '../API/Key';

import backicon from "../assets/backicon.png";

const FindArea = () => {
    const location = useLocation();
    const history = useHistory();
    const [data, setData] = useState();
    const [input, setInput] = useState("");
    const [localNum, setLocalNum] = useState({"area": "", "areaCode": ""});

    const lang = location.state.lang;

    let moveTo = location.state.moveTo;
    let areaList = [];

    const tmp = (lang === "KorService")
        ? [
            "위치설정",
            "도시를 선택하세요",
            "광역시",
            "서울",
            "인천",
            "대전",
            "대구",
            "광주",
            "부산",
            "제주",
            "시/군/구"
        ]
        : [
            "Location Setting",
            "Choose a City",
            "Metropolitan",
            "Seoul",
            "Incheon",
            "Daejeon",
            "Daegu",
            "Gwangju",
            "Busan",
            "Jeju",
            "City/Country"
        ];

    const api = (code, e) => {
        const url = `http://api.visitkorea.or.kr/openapi/service/rest/${lang}/areaCode?ServiceKey=${serviceKey}&areaCode=${code}&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=AppTest`;

        setLocalNum((tmp) => ({
            ...tmp,
            "area": e.target.innerText,
            "areaCode": code
        }));

        axios
            .get(url)
            .then((res) => {
                const areaItem = res.data.response.body.items.item;
                // areaCode는 즉각적인 반응이 잘 일어나는 데 비해 useState를 이용한 data는 항상 한발짝 느리다. 왜 그럴까? 이번
                // 렌더링에서 setData로 값을 설정하고, 그 다음 렌더링에서 해당 값이 반영되기 때문
                setData(areaItem);
            });
    }

    const subArea = (code) => {
        for (let key in code) {
            areaList.push(code[key].name);
        }
        return areaList;
    }

    const goBack = () => {
        history.push({
            pathname: `/`,
            search: ``,
            state: {
                lang: lang
            }
        })
    }

    return (
        <div>
            <div className="header2">
                <img className="backicon" src={backicon} alt="backicon" onClick={goBack}/>
                <h1>{tmp[0]}</h1>
                <div className="btn_class_M"></div>
            </div>
            <p className="normalfont">{tmp[1]}</p>
            <p className="findingplace">{tmp[2]}</p>
            <div className="containerList">
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(1, e);
                    }}>{tmp[3]}</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(2, e);
                    }}>{tmp[4]}</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(3, e);
                    }}>{tmp[5]}</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(4, e);
                    }}>{tmp[6]}</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(5, e);
                    }}>{tmp[7]}</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(6, e);
                    }}>{tmp[8]}</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(39, e);
                    }}>{tmp[9]}</button>
            </div>
            <p className="findingplace">{tmp[10]}</p>
            <div className="containerList2">
                <SubArea citylist={subArea(data)} area={localNum} moveTo={moveTo} lang={lang}/>
            </div>
        </div>
    );
};

export default FindArea;