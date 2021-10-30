import {React} from 'react';
import {useHistory} from "react-router-dom";

const SubArea = ({langData, citylist, area, moveTo, i18n}) => {
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

            let type = (moveTo === "rest")
                ? {
                    "type": [],
                    "friendly": ""
                }
                : (
                    (i18n === "kr")
                        ? 12
                        : 76
                );

            history.push({
                pathname: `/${moveTo}list`,
                search: `?sort=${target}`,
                state: {
                    langData:langData,
                    moveTo: moveTo,
                    code: code,
                    defState: false,
                    optList: type,
                    i18n:i18n
                }
            })
        }

        for (let i = 0; i < list.length; i++) {
            tmp.push(
                <button className="itemList2" key={citylist[i]} onClick={(e) => goList(e, i)}>{citylist[i]}</button>
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