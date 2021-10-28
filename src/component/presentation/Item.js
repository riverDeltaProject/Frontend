import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import noImg from "../assets/noImg.png"

function Item({rlist, moveTo, code, filType, langData, i18n}) {
    const history = useHistory();
    const [linkName, setLinkName] = useState("");
    let rlist_tmp = [];

    const goDetail = (rkey) => {
        const data = rlist[rkey];

        setLinkName(rlist[rkey].name);

        history.push({
            pathname: `/${moveTo}res`,
            search: `?sort=${linkName}`,
            state: {
                data: data,
                code: code,
                moveTo: moveTo,
                filType: filType,
                langData: langData,
                i18n : i18n
            }
        })
    }

    for (let rkey in rlist) {
        rlist_tmp.push(
            <div key={rkey} className="rst_list_cell" onClick={() => goDetail(rkey)}>
                <img
                    className="rst_list_img"
                    src={(rlist[rkey].firstimage === undefined)?noImg : rlist[rkey].firstimage}
                    alt={"about attraction image"}/>
                <div className="bottom">
                    <button className="rst_list_name">
                        {rlist[rkey].name}
                    </button>
                    <div className="rst_list_position">
                        {rlist[rkey].address}
                    </div>
                </div>
            </div>
        )
    }

    return (<div>
        {rlist_tmp}
    </div>);
}

export default Item;