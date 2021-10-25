import React from 'react';

function Item({rlistName, rlistAddress, lang}) {
    const suggestion = () => {
        let tmp = [];

        if (rlistName.length === 0) {
            tmp.push(<div className="attr_noResult">{(lang==="KorService")?"주변 관광지가 없습니다":"No Result"}</div>)
        } else{
            for(let i=0; i<rlistName.length; i++) {
                tmp.push(
                    <div key={i} className="attr_list_cell">
                        <div className="att_info">
                            <button className="attr_list_name">
                                {rlistName[i]}
                            </button>
                            <div className="attr_list_position">
                                {rlistAddress[i]}
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