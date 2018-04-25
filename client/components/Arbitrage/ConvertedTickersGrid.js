import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button } from 'reactstrap';
import moment from 'moment';

import { getConvertedTickers, sortConvertedTickers } from '../../actions/arbitrage';
import DataGridToolbar from './../DataGridToolbar/DataGridToolbar';

class ConvertedTickersGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.handleGridSort = this.handleGridSort.bind(this);

        const columns = [
            { key: 'exchangeName', name: 'Name', sortable: true},
            { key: 'exchangeId', name: 'CCXT-ID', sortable:true },
            { key: 'symbol', name: 'Symbol', sortable: true},
            { key: 'bid', name: 'Bid', sortable: true },
            { key: 'ask', name: 'Ask', sortable: true },
            { key: 'tickerTimestamp', name: 'Timestamp', sortable: true, formatter: ({value}) => moment(value).toISOString(), filterbale: true }
        ];
        this.state ={
            cryptocurrency: 'BTC',
            columns
        };
        
    }       
      
    componentWillMount(){
        this.props.getConvertedTickers(this.state.cryptocurrency);
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
    rowGetter = (i) => {
        return this.props.arbitrage.convertedtickers[i];
    };
    
    render() {
        return  (
            <div>
                <DataGridToolbar handleRefreshClick={this.props.getConvertedTickers(this.state.cryptocurrency)}/>
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
    getConvertedTickers : (crypt) => dispatch(getConvertedTickers(crypt)),
    sortConvertedTickers: (data) => dispatch(sortConvertedTickers(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConvertedTickersGrid);