import React, { Component } from 'react';
//import SimpleArbitrageGrid from './../../components/arbitrage/simplearbitragegrid';
import TabsView from './../../components/Arbitrage/Weighted/TabsView';

class WeightedArbitrageView extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="animated fadeIn">
                <TabsView />
            </div>
        )
    }

}

export default WeightedArbitrageView;