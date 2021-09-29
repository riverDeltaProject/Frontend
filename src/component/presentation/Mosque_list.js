import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Modal_Mosque from './Modal_Mosque.js';
import Item from './Item.js';
import Pagination from './Pagination.js';
import {mosque} from '../API/mosque_list'

import backicon from "../assets/backicon.png";
import icon_filter from "../assets/icon_filter.png"
import mosqueicon from "../assets/mosqueicon.png";

const Mosque_list = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const currentPosts = (tmp) => {
        return tmp.slice(indexOfFirst, indexOfLast);
    }

    let numOfFirst = currentPage - 4;
    let numOfLast = currentPage + 4;

    if(numOfFirst<=0){
      numOfFirst = 1;
      numOfLast = 9;
    }

    return (
        <div>
            <Link to="./"><img className="backicon" src={backicon} alt="backicon"/></Link>
            <h1 className="header2">모스크</h1>
            <div className="mosque_prom">
                <div className="prom_text_mosque">
                    <p className="name_mosque">모스크명</p>
                    <p className="scorepos_mosque">가게 위치</p>
                </div>
            </div>
            <div className="btn_class_mosque">
                <form action="search.php" method="post">
                    <input className="btn_text_mosque" type="text"/>
                    <input className="btn_submit_mosque" type="submit" value="SEARCH"/>
                </form>
                <React.Fragment>
                    <button className="button_filter" onClick={openModal}><img className="icon_filter" src={icon_filter} alt="icon_filter"/></button>
                    <Modal_Mosque open={modalOpen} close={closeModal} header="필터">
                        <div className="placetype">
                            <div>
                                <button><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                <p>모스크</p>
                            </div>
                            <div>
                                <button><img className="icon_mosque" src={mosqueicon} alt="mosqueicon"/></button>
                                <p>기도실</p>
                            </div>
                        </div>
                    </Modal_Mosque>
                </React.Fragment>
            </div>
            <Item rlist={currentPosts(mosque)} moveTo="mosque"/>
            <Pagination
                postsPerPage={postsPerPage}
                start={numOfFirst}
                last={numOfLast}
                paginate={setCurrentPage}/>
        </div>
    );
};

export default Mosque_list;