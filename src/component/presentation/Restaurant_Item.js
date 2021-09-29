import React, {useState, useEffect} from 'react';
import {Route, Link, useHistory} from 'react-router-dom';

function Restaurant_Item({rlist}) {
    const history = useHistory();
    const [rstData, setResData] = useState([]);
    const [linkName, setLinkName] = useState("");
    let rlist_tmp = [];

    const goDetail = (rkey) => {
        const data = rlist[rkey];
        const link = rlist[rkey].restName;

        setResData(data);
        setLinkName(link);

        history.push({
            pathname:"/restaurant_result",
            search : `?sort=${link}`,
            state : {data : data}
        })
    }

    for (let rkey in rlist) {
        rlist_tmp.push(
                <div className="rst_list_cell" onClick={() => goDetail(rkey)}>
                    <div key={rkey}>
                        <button className="rst_list_name">
                            {rlist[rkey].restName}
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

export default Restaurant_Item;