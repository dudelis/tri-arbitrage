import React, { Component } from 'react';
import TickerGrid from './../../components/TickerGrid/TickerGrid';

class TickerView extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="animated fadeIn">
                <TickerGrid />
            </div>
        )
    }

}

export default TickerView;