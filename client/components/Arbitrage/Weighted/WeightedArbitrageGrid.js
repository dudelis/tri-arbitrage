import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button, Input, InputGroup, InputGroupAddon, Col } from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import { getWeightedArbitrageTable } from './../../../actions/arbitrage';

class WeightedArbitrageGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this.refreshGrid = this.refreshGrid.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state ={
            cryptocurrency: 'BTC',
            volume: 10000,
            loading: false
        };        
    }
      
    componentDidMount(){
        this.refreshGrid();
    };
    handleInputChange(e){
        this.setState({volume:e.target.value});
        this.refreshGrid();
    }
    refreshGrid(){
        this.setState({loading:true});
        this.props.getWeightedArbitrageTable(this.state.cryptocurrency, this.state.volume, ()=>{this.setState({loading:false})});        
    }
    handleKeyPress(e){
        if (e.key ==='Enter'){
            this.refreshGrid();
        }
    }
    rowGetter = (i) => {
        return this.props.arbitrage.weightedArbitrageTable.rows[i];
    };

    render() {
        return  (
            <div className={"arbitrage-grid" + (this.state.loading?" loading":'')}>
                <div className="spinner">
                    <ClipLoader
                        color={'#20a8d8'} 
                        loading={this.state.loading} 
                    />
                </div>
                <ReactDataGrid
                    columns= {this.props.arbitrage.weightedArbitrageTable.columns}
                    rowGetter= {this.rowGetter}
                    rowsCount={this.props.arbitrage.weightedArbitrageTable.rows.length}
                    minHeight={800}
                    toolbar={
                        <div style={{width:'30%'}}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Arbitrage amount:</InputGroupAddon>
                                    <Input
                                        value={this.state.volume}
                                        onChange={this.handleInputChange} 
                                        type="select"
                                    >
                                        <option>10000</option>
                                        <option>25000</option>
                                        <option>50000</option>
                                    </Input>
                                <InputGroupAddon addonType="append">USD</InputGroupAddon>
                            </InputGroup>
                        </div>
                    }
                />
                
            </div>
        );
    }
}

const mapStateToProps = (state, props) =>({
    arbitrage: state.arbitrage
});
const mapDispatchToProps = (dispatch, props) =>({
    getWeightedArbitrageTable : (crypt, vol, callback) => dispatch(getWeightedArbitrageTable(crypt, vol, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(WeightedArbitrageGrid);