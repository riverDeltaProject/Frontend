import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import SubArea from './SubArea';
import {serviceKey} from '../API/Key';

import backicon from "../assets/backicon.png";
import homeIcon from "../assets/homeIcon.png"
import background from "../assets/searchBackground.png"

const FindArea = ({location}) => {
    const [maindata, setData] = useState();
    const [localNum, setLocalNum] = useState({"area": "", "areaCode": ""});

    let areaList = [];

    const i18n = location.state.i18n;
    const moveTo = location.state.moveTo;
    const langData = location.state.langData;

    const api = (code, e) => {
        let lang = (i18n === 'en')
            ? "EngService"
            : "KorService";
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
                // areaCode는 즉각적인 반응이 잘 일어나는 데 비해 useState를 이용한 maindata는 항상 한발짝 느리다. 왜 그럴까? 이번
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

    return (
        <div className="FindingCon">
            <img src={background} alt="background Img" id="backImg"/>
            <div className="findingHeader">
                <Link to="/"><img src={homeIcon} alt={homeIcon}/></Link>
                <h1>{langData.setLoc}</h1>
            </div>
            <div className="header2">
                <Link to="/"><img className="backicon" src={backicon} alt="backicon"/></Link>
                <h1>{langData.setLoc}</h1>
                <div className="btn_class_M"></div>
            </div>
            <p className="normalfont">{langData.choCity}</p>
            <div className="findContainer">
                <div>
                    <p className="findingplace">{langData.choMet}</p>
                    <div className="containerList">
                        <button
                            className="itemList"
                            onClick={(e) => {
                                api(1, e);
                            }}>{langData.Seoul}</button>
                        <button
                            className="itemList"
                            onClick={(e) => {
                                api(2, e);
                            }}>{langData.Incheon}</button>
                        <button
                            className="itemList"
                            onClick={(e) => {
                                api(3, e);
                            }}>{langData.Daejeon}</button>
                        <button
                            className="itemList"
                            onClick={(e) => {
                                api(4, e);
                            }}>{langData.Daegu}</button>
                        <button
                            className="itemList"
                            onClick={(e) => {
                                api(5, e);
                            }}>{langData.Gwangju}</button>
                        <button
                            className="itemList"
                            onClick={(e) => {
                                api(6, e);
                            }}>{langData.Busan}</button>
                        <button
                            className="itemList"
                            onClick={(e) => {
                                api(39, e);
                            }}>{langData.Jeju}</button>
                    </div>
                </div>
                <div>
                    <p className="findingplace">{langData.subCity}</p>
                    <div className="containerList2">
                        <SubArea
                            langData = {langData}
                            citylist={subArea(maindata)}
                            area={localNum}
                            moveTo={moveTo}
                            i18n={i18n}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindArea;