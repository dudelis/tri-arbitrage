import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { getExchanges, setSelectedItems, deleteExchange } from '../../actions/exchanges';
import Toolbar from './Toolbar';

class ExchangeGrid extends Component {
    constructor(props, context) {
        super(props, context);

        this.toggleModalDelete = this.toggleModalDelete.bind(this);
        this.getCellActions = this.getCellActions.bind(this);
        this.confirmModalDelete = this.confirmModalDelete.bind(this);
        const _columns = [
            { key: 'name', name: 'Name' },
            { key: 'ccxt_id', name: 'CCXT-ID' },
            { key: 'localCurrency', name: 'Local Currency' },
            { 
                key: 'includeIntoQuery',
                name: 'Include Into Query',
                formatter: function(val){
                    return val ? <input type="checkbox" checked readOnly/>: <input type="checkbox" readOnly/>  
                }
            },
            { key: '_id', name: 'ID' },

        ];
        this.state = {
            _columns,
            modalDelete: false,
            deleteId: ''
        };

    }
        
      
    componentWillMount(){
        this.props.getExchanges();
    };
    onRowsSelected = (rows) => {
        const selectedItems = this.props.exchanges.selectedItems.concat(rows.map(r => r.row._id));
        this.props.setSelectedItems(selectedItems);
    };
    onRowsDeselected = (rows) => {
        let rowIds = rows.map(r=> r.row._id);
        const selectedItems = this.props.exchanges.selectedItems.filter((id) => rowIds.indexOf(id)=== -1);
        this.props.setSelectedItems(selectedItems);
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
    render() {
        return  (
            <div>
                <Toolbar />
                <ReactDataGrid
                    rowKey="_id"
                    columns={this.state._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.exchanges.data.length}
                    minHeight={800}
                    getCellActions={this.getCellActions}
                    rowSelection = {{
                        showCheckbox: true,
                        enableShiftSelect: true,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy:{
                            keys: {
                                rowKey: '_id', 
                                values:  this.props.exchanges.selectedItems
                            }
                        }
                    }}/>
                <Modal isOpen={this.state.modalDelete} toggle={this.toggleModalDelete} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModalDelete}>Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you would like to delete the item?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.confirmModalDelete}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModalDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>                
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
    deleteExchange: (id) => dispatch(deleteExchange(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeGrid);