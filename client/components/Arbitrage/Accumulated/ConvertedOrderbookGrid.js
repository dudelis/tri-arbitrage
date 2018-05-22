import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';

import { getAccumulatedConvertedOrderbook, sortAccConvertedOrderbook } from './../../../actions/arbitrage';
import DataGridToolbar from './../../DataGridToolbar/DataGridToolbar';

class AccConvertedOrderbookGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this.refreshGrid = this.refreshGrid.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.handleGridSort = this.handleGridSort.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        const columns = [
            { key: 'exchangeName', name: 'Name', sortable: true},
            { key: 'exchangeId', name: 'CCXT-ID', sortable:true },
            { key: 'symbol', name: 'Symbol', sortable: true},
            { key: 'bid', name: 'Bid', sortable: true },
            { key: 'ask', name: 'Ask', sortable: true },
            { key: 'createdAt', name: 'Timestamp', sortable: true, formatter: ({value}) => moment(value).toISOString(), filterbale: true }
        ];
        this.state ={
            cryptocurrency: 'BTC',
            columns,
            volume: null,
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
        const data = sortDirection === 'NONE' ? this.props.arbitrage.accconvertedorderbook.slice(0) : this.props.arbitrage.accconvertedorderbook.sort(comparer);
        this.props.sortAccConvertedOrderbook(data);
    };
    handleInputChange(e){
        this.setState({volume:e.target.value});
    }
    handleKeyPress(e){
        if (e.key ==='Enter'){
            this.refreshGrid();
        }
    }
    refreshGrid(){
        this.setState({loading:true});
        this.props.getAccumulatedConvertedOrderbook(this.state.cryptocurrency, this.state.volume, ()=>{this.setState({loading:false})});
    }
    rowGetter = (i) => {
        return this.props.arbitrage.accconvertedorderbook[i];
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
                    rowsCount={this.props.arbitrage.accconvertedorderbook.length}
                    onGridSort={this.handleGridSort}
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
    getAccumulatedConvertedOrderbook : (crypt, vol, callback) => dispatch(getAccumulatedConvertedOrderbook(crypt, vol, callback)),
    sortAccConvertedOrderbook: (data) => dispatch(sortAccConvertedOrderbook(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccConvertedOrderbookGrid);