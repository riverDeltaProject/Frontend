import {React, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const SubArea = ({citylist, area, moveTo, lang}) => {
    const history = useHistory();
    const code = {
        "area": area["area"],
        "areaCode": area["areaCode"],
        "city": "",
        "cityCode": ""
    }

    const areaBtn = (list) => {
        let tmp = [];

        const goList = (e, i) => {
            const target = e.target.innerText;
            code["city"] = target;
            code["cityCode"] = i + 1

            let type = (moveTo === "restaurant")
                ? {
                    "type": [],
                    "friendly": ""
                }
                : (
                    (lang === "KorService")
                        ? 12
                        : 76
                );

            history.push({
                pathname: `/${moveTo}_list`,
                search: `?sort=${target}`,
                state: {
                    moveTo: moveTo,
                    code: code,
                    defState: false,
                    optList: type,
                    lang: lang
                }
            })
        }

        let procList = "";

        for (let i = 0; i < list.length; i++) {
            if ((citylist[i].includes('gu')) && (citylist[i] !=="Jung-gu")) {
                procList = citylist[i].replace('-gu',"");
            } else if((citylist[i].includes('gu')) && (citylist[i] ==="Jung-gu")){
                procList = "Jung-gu";
            }

            tmp.push(
                <button className="itemList2" key={citylist[i]} onClick={(e) => goList(e, i)}>{procList}</button>
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