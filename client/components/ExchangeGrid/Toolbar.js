import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getExchanges } from '../../actions/exchanges';
import { Button } from 'reactstrap';

class Toolbar extends Component {
    render(){
        return (
            <div className="grid-toolbar">
                <Button
                    outline
                    color="primary"
                    size="sm"
                    onClick={this.props.getExchanges}  
                >
                    Refresh Exchanges
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) =>({
    getExchanges : () => dispatch(getExchanges())
});

export default connect(undefined, mapDispatchToProps)(Toolbar);