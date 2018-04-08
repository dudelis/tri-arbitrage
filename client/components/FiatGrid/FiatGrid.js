import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import moment from 'moment';

import { getFiats, setFiatsSort } from './../../actions/fiats';
import SearchToolbar from './SearchToolbar';
import fiatFilter from './../../selectors/fiats';

class FiatGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            { key: '_id', name: 'ID' },
            { key: 'symbol', name: 'Symbol', sortable: true, filterable:true },
            { key: 'price', name: 'Price', sortable: true, filterbale: true },
            { key: 'timestamp', name: 'Timestamp', sortable: true, formatter: ({value}) => moment.unix(value).toISOString(), filterbale: true },
            { key: 'createdAt', name: 'Queried', sortable: true, formatter: ({value}) => moment(value).toISOString(), filterbale: true }
        ];
        this.state = {
            fiatLimit: 100
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    };  
      
    componentWillMount(){
        this.props.getFiats(this.state.fiatLimit);
    };
    
    rowGetter = (i) => {
        return this.props.fiats.data[i];
    };
    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };    
        const data = sortDirection === 'NONE' ? this.props.fiats.data.slice(0) : this.props.fiats.data.sort(comparer);
        this.props.setFiatsSort(data);
    };
    
    render() {
        return  (
            <div>
                <ReactDataGrid
                    rowKey="_id"
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.fiats.data.length}
                    minHeight={800}
                    onGridSort={this.handleGridSort}
                    toolbar={<SearchToolbar onRefreshClick={this.componentWillMount}/>}
                />
            </div>
        );
      }
}

const mapStateToProps = (state, props) =>({
    fiats: fiatFilter(state.fiats.data, state.fiats.searchFilter)

});
const mapDispatchToProps = (dispatch, props) =>({
    getFiats : (limit) => dispatch(getFiats(limit)),
    setFiatsSort : (data)=>dispatch(setFiatsSort(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiatGrid);