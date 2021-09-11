import React from 'react';

import icon_reset from "../assets/icon_reset.png";

const Modal_Attraction = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (
                <section>
                    <header>
                        <img className="icon_reset" src={icon_reset} alt="icon_reset" />
                        <div className="header_modal_att">
                            {header}
                        </div>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer className="footer_modal_att">
                        <button className="close" onClick={close}> 취소 </button>
                        <button className="close" onClick={close}> 적용 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal_Attraction;