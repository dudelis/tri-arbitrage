import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import { getLogs, sortLogs, searchLogs } from './../../actions/logs';
import logFilter from './../../selectors/logs';
import DataGridToolbar from './../DataGridToolbar/DataGridToolbar';

class LogGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            { key: '_id', name: 'ID', width: 200 },
            { key: 'timestamp', name: 'Timestamp', sortable: true, width: 200},
            { key: 'level', name: 'Level', sortable: true, width: 100},
            { key: 'message', name: 'Message', sortable: true},
            { key: 'meta', name: 'Meta', sortable: true, formatter: ({value}) => JSON.stringify(value) }
        ];
        this.state = {
            logLimit: 1000
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.refreshGrid = this.refreshGrid.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };  
      
    componentWillMount(){
        this.props.getLogs(this.state.logLimit);
    };
    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };    
        const data = sortDirection === 'NONE' ? this.props.logs.data.slice(0) : this.props.logs.data.sort(comparer);
        this.props.sortLogs(data);
    };
    handleInputChange = (e)=>{
        this.props.searchLogs(e.target.value);
    }
    refreshGrid(){
        document.getElementById('grid-search-input').value = '';
        this.props.searchLogs();
        this.props.getLogs(this.state.logLimit);
    }
    rowGetter = (i) => {
        return this.props.logs.data[i];
    };    
    
    render() {
        return  (
            <div>
                <DataGridToolbar 
                    handleRefreshClick={this.refreshGrid}
                    handleInputChange={this.handleInputChange}
                />
                <ReactDataGrid
                    rowKey="_id"
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.logs.data.length}
                    minHeight={800}
                    onGridSort={this.handleGridSort}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) =>({
    logs: logFilter(state.logs.data, state.logs.searchFilter)

});
const mapDispatchToProps = (dispatch, props) =>({
    getLogs : (limit) => dispatch(getLogs(limit)),
    sortLogs : (data)=>dispatch(sortLogs(data)),
    searchLogs : (filter)=>dispatch(searchLogs(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogGrid);