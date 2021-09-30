import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const SubArea = ({citylist, area}) => {
    const history = useHistory();
    const areaBtn = (list) => {
        let tmp = [];

        const goList = (cityname)=>{
            history.push({
                pathname: '/restaurant_list',
                search: `?sort=${cityname}`,
                state:{
                    city:cityname,
                    area : area
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