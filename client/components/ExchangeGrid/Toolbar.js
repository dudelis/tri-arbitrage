import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getExchanges } from '../../actions/exchanges';
import { Button, Container, Row, Col } from 'reactstrap';

class Toolbar extends Component {
    render(){
        return (
            <Container fluid className="grid-toolbar">
                <Row>
                    <Col>
                        <Button
                            color="primary" 
                            onClick={this.props.addButtonClick}
                            id="addExchange"
                        >
                            <i className="fa fa-plus">
                            </i>
                            {'\u00A0'}Add
                        </Button>{' '}
                        <Button
                            color="primary"
                            onClick={this.props.editButtonClick}
                            disabled={this.props.exchangeId ? false : true }
                            id="editExchange"
                            >
                            <i className="fa fa-edit"></i>
                            {'\u00A0'}
                            Edit
                        </Button>{' '}
                        <Button outline color="primary" onClick={this.props.getExchanges}><i className="fa fa-refresh"></i>{'\u00A0'}Refresh</Button>{' '}
                        <Button
                            outline
                            color="primary"
                            disabled={this.props.exchangeId ? false : true }
                        >
                            <i className="fa fa-cloud-download"></i>
                            {'\u00A0'}Sync Exchange
                        </Button>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, props) =>({
    getExchanges : () => dispatch(getExchanges())
});

export default connect(undefined, mapDispatchToProps)(Toolbar);