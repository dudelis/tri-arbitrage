import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Button } from 'reactstrap';

import { getArbitrageTable } from '../../actions/arbitrage';
import DataGridToolbar from './../DataGridToolbar/DataGridToolbar';

class SimpleArbitrageGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this.componentWillMount = this.componentWillMount.bind(this);
    }       
      
    componentWillMount(){
        this.props.getArbitrageTable();
    };
    rowGetter = (i) => {
        return this.props.arbitrage.arbitrageTable.rows[i];
      };
    
    render() {
        return  (
            <div className="arbitrage-grid">
                <DataGridToolbar handleRefreshClick={this.props.getArbitrageTable}/>
                <ReactDataGrid
                    columns= {this.props.arbitrage.arbitrageTable.columns}
                    rowGetter= {this.rowGetter}
                    rowsCount={this.props.arbitrage.arbitrageTable.rows.length}
                    minHeight={800}
                    cellRenderer={(cell)=>{console.log(cell)}}
                />  
            </div>
        );
      }
}

const mapStateToProps = (state, props) =>({
    arbitrage: state.arbitrage
});
const mapDispatchToProps = (dispatch, props) =>({
    getArbitrageTable : () => dispatch(getArbitrageTable())
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleArbitrageGrid);