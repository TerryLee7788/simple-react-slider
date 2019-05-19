import React from 'react';

const SliderItem = (props) => (
    <li
        className={`s-item ${props.className ? props.className : ''}`}
    >
        {props.item}
    </li>
)

export default SliderItem;
