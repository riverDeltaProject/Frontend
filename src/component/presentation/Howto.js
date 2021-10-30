import React, {useState} from 'react';
import {Link} from "react-router-dom";
import homeIcon from "../assets/homeIcon.png"

import And_1 from "../assets/AND/And_1.png"
import And_2 from "../assets/AND/And_2.png"

import End from "../assets/home.jpg"

import Ios_1 from "../assets/IOS/IOS_1.png"
import Ios_2 from "../assets/IOS/IOS_2.png"

const Howto = ({location}) => {
    const langData = location.state.langData;

    return (
        <div className="resultContainer">
            <div className="resHeader">
                <Link
                    to={{
                        pathname: `/`,
                        state: {
                            i18n: location.state.i18n,
                            langData: langData
                        }
                    }}>
                    <img className="backicon" src={homeIcon} alt="backicon"/>
                </Link>
            </div>
            <div className="resultHeader">
                <h1>{langData.howTo}</h1>
            </div>
            <div className="expBody">
                <div>
                    <h2>{langData.android}</h2>
                    <div className="explain">
                        <p>{langData.and1}</p>
                        <img alt={langData.and1} src={And_1}/>
                        <p>{langData.addicon}</p>
                        <img alt={langData.addicon} src={And_2}/>
                        <p>{langData.end}</p>
                        <img alt={langData.end} src={End}/>
                    </div>
                </div>
                <div>
                    <h2>{langData.ios}</h2>
                    <div className="explain">
                        <p>{langData.ios1}</p>
                        <img alt={langData.ios1} src={Ios_1}/>
                        <p>{langData.addicon}</p>
                        <img alt={langData.addicon} src={Ios_2}/>
                        <p>{langData.end}</p>
                        <img alt={langData.end} src={End}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Howto;