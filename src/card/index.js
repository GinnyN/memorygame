import React from 'react';
import './style.css';

const Card = ({ obj, checkOpen, found, opened, index }) => {

    const openCard = () => {    
        if(!found) checkOpen(obj.id);
    }
    return <React.Fragment>{found || opened ? 
        <button className="memory__card" style={{backgroundImage: `url('${obj.image}')`}} aria-label={`${obj.id} Card`}></button>:
        <button className="memory__card" onClick={() => openCard(true)}  aria-label={`Number ${index} Closed Card`}> </button>
    }</React.Fragment>
}

export default Card;