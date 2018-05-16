import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
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
            volume: null,
            loading: false
        };        
    }
      
    componentDidMount(){
        this.refreshGrid();
    };
    handleInputChange(e){
        this.setState({volume:e.target.value});
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
                        <div>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Volume:</InputGroupAddon>
                                <Input 
                                    placeholder="Enter volume of crypto currency for arbitrage"
                                    value={this.state.volume}
                                    onChange={this.handleInputChange} 
                                    type="number"
                                    onKeyPress={this.handleKeyPress}
                                />
                                <InputGroupAddon addonType="append"><Button color="secondary" onClick={this.refreshGrid}>Refresh</Button></InputGroupAddon>
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