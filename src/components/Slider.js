import React, { Component } from 'react';
import SliderItem from './SliderItem';

import '../reset.css';
import '../slider.scss';

class Slider extends Component {

    constructor (props) {

        super(props);
        this.state = {
            index: 1
        };

        this.maxLength = this.props.sliderData.length;

        // clone first item
        this.firstClone = this.props.sliderData[0];
        // clone last item
        this.lastClone = this.props.sliderData[this.maxLength - 1];

        this.sliderContainerRef = React.createRef();
        this.sliderContainerWidth = 0;
        this.lock = false;

    }

    transformSlider = (index, doAnimate = false) => {

        return new Promise((resolve) => {

            const offset = index * this.sliderContainerWidth;
            if (doAnimate) {

                this.sliderContainerRef.current.style.transitionDuration = '.5s';

            }
            this.sliderContainerRef.current.style.transform = `translateX(${-offset}px)`;

            setTimeout(() => {

                resolve();
                this.sliderContainerRef.current.style.transitionDuration = '';

            }, 500);

        });

    };

    handleSliderAnimation = (index) => {

        // lock animate
        this.lock = true;

        this.transformSlider(index, true)
            .then(() => {

                // unlock animate
                this.lock = false;

                // do like infinite slider
                if (index === 0) {

                    this.transformSlider(this.maxLength);

                }
                else if (index > this.maxLength) {

                    this.transformSlider(1);

                }

            });

    };

    handleSliderStateIndex = (index) => {

        // 阻止連續點擊
        if (this.lock) { return; }

        this.setState(() => {

            this.handleSliderAnimation(index);

            if (index === 0) {

                index = this.maxLength;

            }
            else if (index > this.maxLength) {

                index = 1;

            }

            return {
                index
            };

        });

    };

    handleDotClick = (index) => {

        this.handleSliderStateIndex(index);

    };

    handlePrevClick = () => {

        let index = this.state.index;
            index -= 1;

        this.handleSliderStateIndex(index);

    };

    handleNextClick = () => {

        let index = this.state.index;
            index += 1;

        this.handleSliderStateIndex(index);

    };

    handleWindowResize = () => {

        this.sliderContainerWidth = this.sliderContainerRef.current.offsetWidth;
        this.transformSlider(this.state.index);

    };

    componentDidMount () {

        this.sliderContainerWidth = this.sliderContainerRef.current.offsetWidth;
        this.transformSlider(1);

        window.addEventListener('resize', this.handleWindowResize);

    }

    componentWillUnmount () {

        window.removeEventListener('resize', this.handleWindowResize);

    }

    render () {

        return (
            <div className="slider">
              <span
                className="slider-btn previous-btn"
                onClick={this.handlePrevClick}
              >
                prev
              </span>
              <ul
                className="slider-container"
                ref={this.sliderContainerRef}
              >
                    {
                        <SliderItem
                            item={this.lastClone}
                            className={`item-${this.maxLength}`}
                        />
                    }
                    {
                        this.props.sliderData.map((item, idx) => (
                            <SliderItem
                                key={idx}
                                item={item}
                                className={`item-${idx + 1}`}
                            />
                        ))
                    }
                    {
                        <SliderItem
                            item={this.firstClone}
                            className={`item-1`}
                        />
                    }
              </ul>
              <ul className="dot-container">
                  {
                    this.props.sliderData.map((item, idx) => (
                        <li
                            className={`dot ${idx +1 === this.state.index ? 'active': ''}`}
                            key={idx}
                            onClick={() => {

                                this.handleDotClick(idx+1);

                            }}
                        >
                        </li>
                    ))
                  }
              </ul>
              <span
                className="slider-btn next-btn"
                onClick={this.handleNextClick}
              >
                next
              </span>
            </div>
        )

    }

}

export default Slider;
