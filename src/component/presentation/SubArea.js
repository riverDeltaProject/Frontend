import React from 'react';
import {useHistory} from "react-router-dom";

const SubArea = ({citylist, area, moveTo}) => {
    const history = useHistory();
    const areaBtn = (list) => {
        let tmp = [];

        const goList = (cityname)=>{
            history.push({
                pathname: `/${moveTo}_list`,
                search: `?sort=${cityname}`,
                state:{
                    city:cityname,
                    area : area,
                    moveTo:moveTo
                }
            })
        }

        for (let i = 0; i < list.length; i++) {
            tmp.push(
                    <button className="itemList2" key={citylist[i]} onClick={()=>goList(citylist[i])}>{citylist[i]}</button>
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