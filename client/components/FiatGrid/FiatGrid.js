import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import moment from 'moment';

import { getFiats } from './../../actions/fiats';

class FiatGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            { key: '_id', name: 'ID' },
            { key: 'symbol', name: 'Symbol', sortable: true },
            { key: 'price', name: 'Price', sortable: true },
            { key: 'timestamp', name: 'Timestamp', sortable: true, formatter: ({value}) => moment(value).toISOString() },
            { key: 'createdAt', name: 'Queried', sortable: true, formatter: ({value}) => moment(value).toISOString() }
        ];
        this.state = {
            fiatLimit: 100
        };
    };  
      
    componentWillMount(){
        this.props.getFiats(this.state.fiatLimit);
    };
    
    rowGetter = (i) => {
        return this.props.fiats.data[i];
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
                    />          
            </div>
        );
      }
}

const mapStateToProps = (state, props) =>({
    fiats: state.fiats
});
const mapDispatchToProps = (dispatch, props) =>({
    getFiats : (limit) => dispatch(getFiats(limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiatGrid);