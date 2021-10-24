import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import noImg from "../assets/noImg.png"
import Notfound from "../assets/notfound.png"

function Item({rlist, moveTo, code, filType, lang}) {
    const history = useHistory();
    const [linkName, setLinkName] = useState("");
    let rlist_tmp = [];

    const tmp = (lang === "KorService")?"검색 결과가 존재하지 않습니다":"No Result";

    const goDetail = (rkey) => {
        let data = []

        if (Object.keys(rlist)[0] !== "0") {
            data = rlist;

            setLinkName(rlist["name"])
        } else {
            data = rlist[rkey];

            setLinkName(rlist[rkey].name);
        }

        history.push({
            pathname: `/${moveTo}_result`,
            search: `?sort=${linkName}`,
            state: {
                data: data,
                code: code,
                list: rlist,
                moveTo: moveTo,
                filType: filType,
                lang: lang
            }
        })
    }

    if (Object.keys(rlist)[0] !== "0") {
        if (Object.keys(rlist).length !== 0) {
            rlist_tmp.push(
                <div key={0} className="rst_list_cell" onClick={() => goDetail(0)}>
                    <img
                        className="rst_list_img"
                        src={(
                            rlist["firstimage"] === undefined)
                            ? noImg
                            : rlist["firstimage"]}
                        alt={"about attraction image"}/>

                    <div>
                        <button className="rst_list_name">
                            {rlist["title"]}
                        </button>
                        <div className="rst_list_position">
                            {rlist["addr1"]}
                        </div>
                    </div>
                </div>
            )
        } else {
            rlist_tmp.push(
                <div className="errorMsg">
                            <img src={Notfound} className="notFound" alt="검색 결과가 존재하지 않습니다"/>
                            <div className="noRes">{tmp}</div>
                        </div>
            )
        }
    } else {
        for (let rkey in rlist) {

            rlist_tmp.push(
                <div key={rkey} className="rst_list_cell" onClick={() => goDetail(rkey)}>
                    <img
                        className="rst_list_img"
                        src={(
                            rlist[rkey].firstimage === undefined)
                            ? noImg
                            : rlist[rkey].firstimage}
                        alt={"about attraction image"}/>

                    <div>
                        <button className="rst_list_name">
                            {rlist[rkey].title}
                        </button>
                        <div className="rst_list_position">
                            {rlist[rkey].addr1}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (<div>
        {rlist_tmp}
    </div>);
}

export default Item;