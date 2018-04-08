import React, { Component } from 'react';
import SimpleArbitrageGrid from './../../components/arbitrage/simplearbitragegrid';

class SimpleArbitrageView extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="animated fadeIn">
                <SimpleArbitrageGrid />
            </div>
        )
    }

}

export default SimpleArbitrageView;