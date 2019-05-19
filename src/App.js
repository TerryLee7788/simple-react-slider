import React, { Component } from 'react';
import Slider from './components/Slider';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            sliderData: [
                '111',
                '222',
                '333',
                '444',
                '555',
            ]
        };

    }

    render () {

        return (
            <div className="slider-demo">
                <h1>simple slider demo</h1>
                <Slider
                    sliderData={this.state.sliderData}
                />

            </div>
        )

    }

}

export default App;
