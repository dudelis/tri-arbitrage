import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';

import { getWeightedArbitrageList, sortConvertedOrderbook, sortConvertedTickers } from './../../../actions/arbitrage';
import DataGridToolbar from './../../DataGridToolbar/DataGridToolbar';

class ConvertedOrderbookGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this.refreshGrid = this.refreshGrid.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.handleGridSort = this.handleGridSort.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        const columns = [
            { key: 'askexchange', name: 'AskExchange', sortable: true, formatter: ({value}) => `${value.name} (${value.ccxt_id})` },
            { key: 'ask', name: 'Ask', sortable: true},
            { key: 'asksymbol', name: 'Ask Symbol', sortable: true},
            { key: 'bidexchange', name: 'Bid Exchange', sortable: true, formatter: ({value}) => `${value.name} (${value.ccxt_id})` },
            { key: 'bid', name: 'Bid', sortable: true},
            { key: 'bidsymbol', name: 'Bid Symbol', sortable: true},
            { key: 'value', name: 'Arbitrage Value', sortable:true },
            { key: 'volume', name: 'Volume', sortable: true},
            { key: 'crypto', name: 'Crypt', sortable: true },
            { key: 'createdAt', name: 'Timestamp', sortable: true, formatter: ({value}) => moment(value).toISOString(), filterbale: true }
        ];
        this.state ={
            cryptocurrency: 'BTC',
            columns,
            volume: 10000,
            loading:false
        };
        
    }       
      
    componentDidMount(){
        this.refreshGrid();
    };
    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };    
        const data = sortDirection === 'NONE' ? this.props.arbitrage.convertedorderbook.slice(0) : this.props.arbitrage.convertedorderbook.sort(comparer);
        this.props.sortConvertedOrderbook(data);
    };
    handleInputChange(e){
        this.setState({volume:e.target.value}, function(){
            this.refreshGrid();
        });
    }
    handleKeyPress(e){
        if (e.key ==='Enter'){
            this.refreshGrid();
        }
    }
    refreshGrid(){
        this.setState({loading:true});
        this.props.getWeightedArbitrageList(this.state.cryptocurrency, this.state.volume, undefined, ()=>{this.setState({loading:false})});
    }
    rowGetter = (i) => {
        return this.props.arbitrage.convertedorderbook[i];
    };
    
    render() {
        return  (
            <div className={this.state.loading?"loading":""}>
                <div className="spinner">
                    <ClipLoader
                        color={'#20a8d8'} 
                        loading={this.state.loading} 
                    />
                </div>
                <ReactDataGrid
                    columns= {this.state.columns}
                    rowGetter= {this.rowGetter}
                    rowsCount={this.props.arbitrage.convertedorderbook.length}
                    onGridSort={this.handleGridSort}
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
    getWeightedArbitrageList : (crypt, vol, timestamp, callback) => dispatch(getWeightedArbitrageList(crypt, vol, timestamp, callback)),
    sortConvertedOrderbook: (data) => dispatch(sortConvertedOrderbook(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConvertedOrderbookGrid);