import React from 'react';
import './CarouselItem.css';

const carouselItem = (props) => {
    return (
        <div style={{flexBasis: `${props.itemWidth}%`}} className="CarouselItem">
            <img className="CarouselImage" src={`https://picsum.photos/500/200?random=${props.id}`}/>
            <div className="CarouselInfo">
                <h3>{props.title}</h3>
                <p>{props.body}</p>
            </div>
        </div>
    );
}

export default carouselItem;