import React, { Component } from 'react';
import FiatGrid from './../../components/FiatGrid/FiatGrid';

class FiatView extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="animated fadeIn">
                <FiatGrid />
            </div>
        )
    }

}

export default FiatView;