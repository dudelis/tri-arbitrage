import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button } from 'reactstrap';
import moment from 'moment';

import { getSimpleArbitrageList, sortConvertedTickers } from '../../actions/arbitrage';
import DataGridToolbar from './../DataGridToolbar/DataGridToolbar';

class ConvertedTickersGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.refreshGrid = this.refreshGrid.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.handleGridSort = this.handleGridSort.bind(this);

        const columns = [
            { key: 'exchange', name: 'Exchange', sortable: true, formatter: ({value}) => `${value.name} (${value.ccxt_id})`},
            { key: 'symbol', name: 'Symbol', sortable: true},
            { key: 'bid', name: 'Bid', sortable: true },
            { key: 'ask', name: 'Ask', sortable: true },
            { key: 'createdAt', name: 'Timestamp', sortable: true, formatter: ({value}) => moment(value).toISOString(), filterbale: true }
        ];
        this.state ={
            cryptocurrency: 'BTC',
            columns
        };
        
    }       
      
    componentWillMount(){
        this.props.getSimpleArbitrageList(this.state.cryptocurrency);
    };
    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };    
        const data = sortDirection === 'NONE' ? this.props.arbitrage.convertedtickers.slice(0) : this.props.arbitrage.convertedtickers.sort(comparer);
        this.props.sortConvertedTickers(data);
    };
    refreshGrid(){
        this.props.getSimpleArbitrageList(this.state.cryptocurrency);
    }
    rowGetter = (i) => {
        return this.props.arbitrage.convertedtickers[i];
    };
    
    render() {
        return  (
            <div>
                <DataGridToolbar handleRefreshClick={this.refreshGrid}/>
                <ReactDataGrid
                    columns= {this.state.columns}
                    rowGetter= {this.rowGetter}
                    rowsCount={this.props.arbitrage.convertedtickers.length}
                    onGridSort={this.handleGridSort}
                    minHeight={800}
                />  
            </div>
        );
    }
}

const mapStateToProps = (state, props) =>({
    arbitrage: state.arbitrage
});
const mapDispatchToProps = (dispatch, props) =>({
    getSimpleArbitrageList : (crypt) => dispatch(getSimpleArbitrageList(crypt)),
    sortConvertedTickers: (data) => dispatch(sortConvertedTickers(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConvertedTickersGrid);