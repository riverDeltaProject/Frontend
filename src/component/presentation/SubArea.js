import {React, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const SubArea = ({citylist, area, moveTo}) => {
    const history = useHistory();
    const code = {
        "area": area["area"],
        "areaCode":  area["areaCode"],
        "city": "",
        "cityCode": ""
    }

    const areaBtn = (list) => {
        let tmp = [];

        const goList = (e, i) => {
            const target = e.target.innerText;
            code["city"] = target;
            code["cityCode"] = i+1

            history.push({
                pathname: `/${moveTo}_list`,
                search: `?sort=${target}`,
                state: {
                    moveTo: moveTo,
                    code: code
                }
            })
        }

        for (let i = 0; i < list.length; i++) {
            tmp.push(
                <button
                    className="itemList2"
                    key={citylist[i]}
                    onClick={(e) => goList(e, i)}>{citylist[i]}</button>
            )
        }

        return tmp;
    }

    return (
        <div className="containerList2">
            {areaBtn(citylist)}
        </div>
    );
};

export default SubArea;