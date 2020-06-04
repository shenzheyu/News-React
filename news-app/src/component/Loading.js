import React, { Component } from 'react';
import { BounceLoader } from 'react-spinners';
import './Loading.css';

class Loading extends Component {
    render() {
        return (
            <div id='loading'>
            <BounceLoader
                size={60}
                color={"#385AD0"}
            />
            Loading
            </div>
        );
    }
}

export default Loading;