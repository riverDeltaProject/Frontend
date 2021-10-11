import React, {useEffect, useState} from 'react';
import {Link, useLocation, useHistory} from "react-router-dom";
import axios from 'axios';
import SubArea from './SubArea';
import {serviceKey} from '../API/Key';

import backicon from "../assets/backicon.png";

const FindArea = () => {
    const history = useHistory();
    const location = useLocation();
    const [areaCode, setAreaCode] = useState();
    const [data, setData] = useState();
    const [area, setArea] = useState("");
    const [input, setInput] = useState("");
    const [localNum, setLocalNum] = useState({city: "", cityCode: ""});
    let moveTo = location.state.moveTo;
    let areaList = [];

    const api = (code) => {
        const areaCode = code;
        const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=${serviceKey}&areaCode=${areaCode}&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=AppTest`;

        setAreaCode(areaCode);

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

    // const setList = (e) => {
    //     let targetData = subArea(data)
    //     setLocalNum({city: '', cityCode: ''})

    //     for (let i = 0; i < targetData.length; i++) {
    //         if (targetData[i].includes(input)) {
    //             console.log("Entered")
    //             setLocalNum((prevState) => ({
    //                 ...prevState,
    //                 city : targetData[i],
    //                 cityCode : i
    //             }))
    //         }
    //     }

    //     console.log(localNum)
    // }

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
                    onClick={() => {
                        api(1);
                    }}>서울시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(2);
                    }}>인천시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(3);
                    }}>대전시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(4);
                    }}>대구시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(5);
                    }}>광주시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(6);
                    }}>부산시</button>
                <button
                    className="itemList"
                    onClick={() => {
                        api(39);
                    }}>제주시</button>
            </div>
            <p className="findingplace">시/군/구</p>
            <div className="containerList2">
                <SubArea citylist={subArea(data)} area={area} moveTo={moveTo}/>
            </div>
        </div>
    );
};

export default FindArea;