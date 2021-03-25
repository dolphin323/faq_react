import { useState } from 'react';
import './Card.css';
import { Data } from "./Data";

const Style_of_q = {
    fontWeight: 'bold'
};

const Card = () => {
    const [clicked, setClicked] = useState(false)
    const toggle = index => {
        if (clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }
    return (
        <div className="all_card">
            <div className="pictures">
                <img src="/images/bg-pattern-desktop.svg" className="romb_img" alt="" />
                <img src="/images/illustration-woman-online-desktop.svg" className="woman_img" alt="" />
            </div>
            <div>
                <img src="/images/illustration-box-desktop.svg" className="cube_img" alt="" />
            </div>
            <div className="faq">
                <h1>FAQ</h1>
                {Data.map((item, index) => {
                    return (
                        <div onClick={() => toggle(index)} key={index}>

                            <div className="questions">
                                {/* {clicked === index ? <p style={ Style_of_q } : <p>} */}
                                <p style={clicked === index ? Style_of_q : null} >
                                    {item.question}
                                    <span className={clicked === index ? "arrow rotate" : "arrow"}><img src="/images/icon-arrow-down.svg" alt="" /></span>
                                </p>
                            </div>
                            {clicked === index ? (
                                <div className="answers">
                                    <p>
                                        {item.answer}
                                    </p>
                                </div>
                            ) : null}

                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Card