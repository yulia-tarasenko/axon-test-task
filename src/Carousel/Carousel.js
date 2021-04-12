import React, {useRef} from 'react';
import CarouselItem from './CarouselItem/CarouselItem';
import './Carousel.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const carousel = (props) => {
    let itemList = null,
    itemListLength = 0,
    itemPercentWidth = 0;
    if (props.items) {
        itemListLength = props.items.length;
        itemPercentWidth = (1 / itemListLength) * 100;
        itemList = props.items.map((item, i) => (
            <CarouselItem itemWidth={itemPercentWidth}
            key={i} id={i} title={item.title} body={item.body}/>
        ));
    }

    const refTrack = useRef(null);
    let currentPosition = 0; 

    const changePosition = (operation) => {
        let widthItem = refTrack.current.offsetWidth / props.items.length;
        let trackWidth = -(refTrack.current.offsetWidth);

        currentPosition = operation == '+' ? currentPosition + widthItem : currentPosition - widthItem;
        if (currentPosition > 0) {
            currentPosition = trackWidth + widthItem;
        } else if (currentPosition == trackWidth) {
            currentPosition = 0;
        }
        refTrack.current.style.transform = `translateX(${currentPosition}px)`;
    }

    return (
        <div className="Carousel">
            <div className="CarouselContainer">
                <div style={{width: `${itemListLength}00%`}} className="CarouselTrack" ref={refTrack}>
                    {itemList}
                </div>
            </div>

            <div className="ButtonContainer">
                <button onClick={() => changePosition('+')}><NavigateBeforeIcon/></button>
                <button onClick={() => changePosition('-')}><NavigateNextIcon/></button>
            </div>
        </div>
    );
}

export default carousel;