import React, { Component } from 'react';
import LogGrid from './../../components/LogGrid/LogGrid';

class LogView extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="animated fadeIn">
                <LogGrid />
            </div>
        )
    }

}

export default LogView;