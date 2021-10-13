import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Item({rlist, moveTo, area, city}) {
    const history = useHistory();
    const [linkName, setLinkName] = useState("");
    let rlist_tmp = [];

    console.log(rlist)

    const goDetail = (rkey) => {
        const data = rlist[rkey];

        setLinkName(rlist[rkey].name);

        history.push({
            pathname: `/${moveTo}_result`,
            search: `?sort=${linkName}`,
            state: {
                data : data,
                area : area,
                city : city,
                moveTo : moveTo
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