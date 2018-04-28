import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { getExchanges, setSelectedItems, deleteExchange, sortExchanges } from '../../actions/exchanges';
import ModalDelete from './ModalDelete';
import ExchangeAddModal from './ExchangeAddModal';
import ExchangeEditModal from './ExchangeEditModal';
import Toolbar from './Toolbar';


class ExchangeGrid extends Component {
    constructor(props, context) {
        super(props, context);

        this.toggleModalDelete = this.toggleModalDelete.bind(this);
        this.toggleModalEdit = this.toggleModalEdit.bind(this);
        this.getCellActions = this.getCellActions.bind(this);
        this.confirmModalDelete = this.confirmModalDelete.bind(this);
        const _columns = [
            { key: 'name', name: 'Name', sortable:true},
            { key: 'ccxt_id', name: 'CCXT-ID', sortable:true },
            { key: 'localCurrency', name: 'Local Currency', sortable:true },
            { 
                key: 'includeIntoQuery',
                name: 'Include Into Query',
                formatter: function(col){
                    return col.value ? 'Yes':'No'  
                },
                sortable:true
            },
            { key: '_id', name: 'ID' },
        ];
        this.state = {
            _columns,
            modalDelete: false,
            modalEdit: false,
            deleteId: '',
            exchangeId:''
        };
    };     
    componentWillMount(){
        this.props.getExchanges();
    };
    onRowsSelected = (rows, idx) => {
        const selectedItems = [];
        selectedItems.push(rows[0].row._id); // = this.props.exchanges.selectedItems.concat(rows.map(r => r.row._id));
        this.props.setSelectedItems(selectedItems);
    };
    onRowsDeselected = (rows) => {
        // let rowIds = rows.map(r=> r.row._id);
        // const selectedItems = this.props.exchanges.selectedItems.filter((id) => rowIds.indexOf(id)=== -1);
        this.props.setSelectedItems([]);
    };

    rowGetter = (i) => {
        return this.props.exchanges.data[i];
    };
    getCellActions(column, row) {
        const _id = row._id;
        if (column.key === '_id') {
            return [{
                icon: 'icon-trash',
                callback: () => {
                    this.setState({deleteId: _id})
                    this.toggleModalDelete()}
            }];
        }
    };

    //Modals
    toggleModalEdit(e) {
        if (e && e.target.id === 'addExchange'){
            this.props.setSelectedItems([]);
        }
        this.setState({
            modalEdit: !this.state.modalEdit
        });
    };

    confirmModalDelete(){
        const _id = this.state.deleteId;
        if (_id){
            this.props.deleteExchange(_id);
        }        
        this.setState({deleteId: ''});
        this.toggleModalDelete();
    };
    toggleModalDelete() {
        this.setState({
            modalDelete: !this.state.modalDelete
        });
    };
    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };    
        const data = sortDirection === 'NONE' ? this.props.exchanges.data.slice(0) : this.props.exchanges.data.sort(comparer);
        this.props.sortExchanges(data);
    };
    
    render() {
        return  (
            <div>
                <Toolbar 
                    addButtonClick={this.toggleModalEdit}
                    editButtonClick={this.toggleModalEdit}
                    toggleModalEdit={this.toggleModalEdit}
                    exchangeId={this.props.exchanges.selectedItems[0]}/>
                <ReactDataGrid
                    rowKey="_id"
                    columns={this.state._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.exchanges.data.length}
                    minHeight={800}
                    getCellActions={this.getCellActions}
                    onGridSort={this.handleGridSort}
                    rowSelection = {{
                        showCheckbox: true,
                        enableShiftSelect: false,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy:{
                            keys: {
                                rowKey: '_id', 
                                values:  this.props.exchanges.selectedItems
                            }
                        }
                    }}/>
                <ModalDelete
                    modalDelete={this.state.modalDelete}
                    toggleModalDelete={this.toggleModalDelete}
                    confirmModalDelete={this.confirmModalDelete}/>
                {this.props.exchanges.selectedItems[0] ? 
                    <ExchangeEditModal
                    exchangeId={this.props.exchanges.selectedItems[0]}
                    exchange={this.props.exchanges.data.find(ex => ex._id === this.props.exchanges.selectedItems[0])}
                    isOpen={this.state.modalEdit}
                    toggle={this.toggleModalEdit}
                    />
                    :
                    <ExchangeAddModal
                        exchange={this.props.exchanges.data.find(ex => ex._id === this.props.exchanges.selectedItems[0])}
                        isOpen={this.state.modalEdit}
                        toggle={this.toggleModalEdit}
                    />                    
                }
            </div>
        );
      }
}

const mapStateToProps = (state, props) =>({
    exchanges: state.exchanges
});
const mapDispatchToProps = (dispatch, props) =>({
    getExchanges : () => dispatch(getExchanges()),
    setSelectedItems : (selectedItems) => dispatch(setSelectedItems(selectedItems)),
    deleteExchange: (id) => dispatch(deleteExchange(id)),
    sortExchanges: (data) => dispatch(sortExchanges(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeGrid);