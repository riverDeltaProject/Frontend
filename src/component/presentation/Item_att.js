import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Item({rlist, moveTo, code, filType, lang}) {
    const history = useHistory();
    const [linkName, setLinkName] = useState("");
    let rlist_tmp = [];

    const goDetail = (rkey) => {
        const data = rlist[rkey];

        setLinkName(rlist[rkey].name);

        history.push({
            pathname: `/${moveTo}_result`,
            search: `?sort=${linkName}`,
            state: {
                data : data,
                code : code,
                list : rlist,
                moveTo : moveTo,
                filType : filType,
                lang : lang
            }
        })
    }
    
    for (let rkey in rlist) {
        rlist_tmp.push(
            <div  key={rkey} className="rst_list_cell" onClick={() => goDetail(rkey)}>
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

    return (<div>
        {rlist_tmp}
    </div>);
}

export default Item;