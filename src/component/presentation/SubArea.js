import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import backicon from "../assets/backicon.png";

const SubArea = ({citylist}) => {
    let tmp = [];

    for (let i = 0; i < citylist.length; i++) {
        tmp.push(<button className="itemList2" key={citylist[i]}>{citylist[i]}</button>)
    }

    return (<div className="containerList2">
        {tmp}
    </div>);
};

export default SubArea;