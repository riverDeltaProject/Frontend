import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Item({rlist, moveTo, code}) {
    const suggestion = () => {
        let tmp = [];

        if (rlist.length === 0) {
            tmp.push(<div className="attr_noResult">주변 식당이 없습니다</div>)
        } else{
            for(let rkey in rlist) {
                tmp.push(
                    <div key={rkey} className="attr_list_cell">
                        <div className="att_info">
                            <button className="attr_list_name">
                                {rlist[rkey].name}
                            </button>
                            <div className="attr_list_position">
                                {rlist[rkey].friendly}
                            </div>
                            <div className="attr_list_position">
                                {rlist[rkey].address}
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return tmp
    }

    return (<div>
        {suggestion()}
    </div>);
}

export default Item;