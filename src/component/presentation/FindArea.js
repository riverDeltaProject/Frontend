import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from 'axios';
import SubArea from './SubArea';
import {serviceKey} from '../API/Key';

import backicon from "../assets/backicon.png";

const FindArea = () => {
    const location = useLocation();
    const [data, setData] = useState();
    const [input, setInput] = useState("");
    const [localNum, setLocalNum] = useState({"area": "", "areaCode": ""});
    
    const lang = location.state.lang;

    let moveTo = location.state.moveTo;
    let areaList = [];

    const api = (code, e) => {
        const url = `http://api.visitkorea.or.kr/openapi/service/rest/${lang}/areaCode?ServiceKey=${serviceKey}&areaCode=${code}&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=AppTest`;

        setLocalNum((tmp)=>({
            ...tmp,
            "area" : e.target.innerText,
            "areaCode" : code
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

    const getInput = (e) => {
        setInput(e.target.value);
    }

    return (
        <div>
            <Link to="./"><img className="backicon" src={backicon} alt="backicon"/></Link>
            <h1 className="header2">위치설정</h1>
            <p className="normalfont">찾고 싶은 위치 및 장소를 입력하세요</p>
            <div className="btn_class">
                <div>
                    <input className="btn_text" type="text" onChange={getInput}/>
                    <input className="btn_submit" type="submit" value="SEARCH"/>
                </div>
            </div>
            <p className="findingplace">광역시</p>
            <div className="containerList">
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(1, e);
                    }}>서울</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(2, e);
                    }}>인천</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(3, e);
                    }}>대전</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(4, e);
                    }}>대구</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(5, e);
                    }}>광주</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(6, e);
                    }}>부산</button>
                <button
                    className="itemList"
                    onClick={(e) => {
                        api(39, e);
                    }}>제주</button>
            </div>
            <p className="findingplace">시/군/구</p>
            <div className="containerList2">
                <SubArea citylist={subArea(data)} area={localNum} moveTo={moveTo} lang={lang}/>
            </div>
        </div>
    );
};

export default FindArea;