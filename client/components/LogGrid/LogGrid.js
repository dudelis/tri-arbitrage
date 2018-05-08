import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import { getLogs, sortLogs, searchLogs, setSelectedItems } from './../../actions/logs';
import {logFilter} from './../../selectors/logs';
import DataGridToolbar from './../DataGridToolbar/DataGridToolbar';
import LogModal from './LogModal';

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
            logLimit: 1000,
            modal: false
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.refreshGrid = this.refreshGrid.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
    onRowsSelected = (rows, idx) => {
        const selectedItems = [];
        selectedItems.push(rows[0].row._id); // = this.props.exchanges.selectedItems.concat(rows.map(r => r.row._id));
        this.props.setSelectedItems(selectedItems);
        this.setState({modal:true});
    };
    onRowsDeselected = (rows) => {
        // let rowIds = rows.map(r=> r.row._id);
        // const selectedItems = this.props.exchanges.selectedItems.filter((id) => rowIds.indexOf(id)=== -1);
        this.props.setSelectedItems([]);
    };
    refreshGrid(){
        document.getElementById('grid-search-input').value = '';
        this.props.searchLogs();
        this.props.getLogs(this.state.logLimit);
    }
    rowGetter = (i) => {
        return this.props.logs.data[i];
    };
    closeModal(){
        this.setState({modal:false});
    }
    
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
                    rowSelection = {{
                        showCheckbox: true,
                        enableShiftSelect: false,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy:{
                            keys: {
                                rowKey: '_id', 
                                values:  this.props.selectedItems
                            }
                        }
                    }}
                />
                <LogModal
                    isOpen = {this.state.modal}
                    toggle = {this.closeModal}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) =>({
    logs: logFilter(state.logs.data, state.logs.searchFilter),
    selectedItems: state.logs.selectedItems
});
const mapDispatchToProps = (dispatch, props) =>({
    getLogs : (limit) => dispatch(getLogs(limit)),
    sortLogs : (data)=>dispatch(sortLogs(data)),
    searchLogs : (filter)=>dispatch(searchLogs(filter)),
    setSelectedItems : (selectedItems) => dispatch(setSelectedItems(selectedItems))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogGrid);