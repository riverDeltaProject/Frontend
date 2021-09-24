import React, {useState, useEffect} from 'react';

function Restaurant_list_axios({rlist}) {
    let rlist_tmp = [];

    for (let rkey in rlist) {
        rlist_tmp.push(
            <div className="rst_list_cell">
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

export default Restaurant_list_axios;