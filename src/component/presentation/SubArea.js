import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import backicon from "../assets/backicon.png";

const SubArea = ({citylist}) => {
    const areaBtn = (list) => {
        let tmp = [];
    
        for (let i = 0; i < list.length; i++) {
            tmp.push(<button className="itemList2" key={citylist[i]}>{citylist[i]}</button>)
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