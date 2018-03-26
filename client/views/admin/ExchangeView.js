import React, { Component } from 'react';
import ExchangeGrid from './../../components/ExchangeGrid/ExchangeGrid';

class ExchangeView extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }
    render(){
        return (
            <div className="animated fadeIn">
                <ExchangeGrid />
            </div>
        )
    }

}

export default ExchangeView;