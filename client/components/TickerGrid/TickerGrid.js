import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import moment from 'moment';

import { getTickers, setTickersSort, searchTicker } from './../../actions/tickers';
import tickerFilter from './../../selectors/tickers';
import SearchToolbar from './SearchToolbar';

class TickerGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            { key: '_id', name: 'ID' },
            { key: 'symbol', name: 'Symbol', sortable: true, filterable:true },
            { key: 'bid', name: 'Bid', sortable: true, filterbale: true },
            { key: 'ask', name: 'Ask', sortable: true, filterbale: true },
            { key: 'timestamp', name: 'Timestamp', sortable: true, formatter: ({value}) => moment(value).toISOString(), filterbale: true },
            { key: 'createdAt', name: 'Queried', sortable: true, formatter: ({value}) => moment(value).toISOString(), filterbale: true }
        ];
        this.state = {
            rowLimit: 1000
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    };  
      
    componentWillMount(){
        this.props.getTickers(this.state.rowLimit);
    };
    
    rowGetter = (i) => {
        return this.props.tickers.data[i];
    };
    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };    
        const data = sortDirection === 'NONE' ? this.props.tickers.data.slice(0) : this.props.tickers.data.sort(comparer);
        this.props.setTickersSort(data);
    };
    
    render() {
        return  (
            <div>
                <ReactDataGrid
                    rowKey="_id"
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.tickers.data.length}
                    minHeight={800}
                    onGridSort={this.handleGridSort}
                    toolbar={<SearchToolbar onRefreshClick={this.componentWillMount}/>}
                />
            </div>
        );
      }
}

const mapStateToProps = (state, props) =>({
    tickers: tickerFilter(state.tickers.data, state.tickers.filters)

});
const mapDispatchToProps = (dispatch, props) =>({
    getTickers : (limit) => dispatch(getTickers(limit)),
    setTickersSort : (data)=>dispatch(setTickersSort(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TickerGrid);