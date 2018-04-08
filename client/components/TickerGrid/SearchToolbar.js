import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, InputGroup, InputGroupAddon, InputGroupText, Form,FormGroup,Col, Input, Row   } from 'reactstrap';
import { searchTicker } from './../../actions/tickers';
import { getExchanges } from '../../actions/exchanges';

class SearchToolbar extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);        
    }
    componentWillMount(){
        this.props.getExchanges();
    };

    handleChange(e){
        const tbx = document.getElementById('grid-search-input');
        const ddlExchange = document.getElementById('grid-select-exchange');
        this.props.searchTicker(tbx.value, ddlExchange.value);
    }
    handleRefreshClick(){
        const tbx = document.getElementById('grid-search-input');
        const ddlExchange = document.getElementById('grid-select-exchange');
        tbx.value='';
        ddlExchange.value='';
        this.props.searchTicker('', '');
        this.props.onRefreshClick();
    }
    
    render() {
      return (
        <Container fluid className="grid-toolbar">
            <Row>
                <Col xs="1">
                    <Button outline color="primary" onClick={this.handleRefreshClick}><i className="fa fa-refresh"></i>{'\u00A0'}Refresh</Button>
                </Col>
                <Col>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-search"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            id="grid-search-input"
                            name="input1-group1"
                            placeholder="Filter" 
                            onChange={this.handleChange} 
                            ref={(input)=>this.gridSearchInput=input}/>
                    </InputGroup>
                </Col>
                <Col xs="3">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Exchange</InputGroupText>
                        </InputGroupAddon>
                            <Input
                                type="select" 
                                name="select" 
                                id="grid-select-exchange"
                                onChange={this.handleChange}>
                                
                                <option value=""></option>
                                {this.props.exchanges.data.map((exchange) =>(
                                    <option key={exchange._id} value={exchange._id}>{exchange.name}</option>
                                ))}
                            </Input>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
      );
    }
}

const mapStateToProps = (state) =>{
    return {
        searchFilters: state.tickers.filters,
        exchanges: state.exchanges
    }
}

const mapDispatchToProps = (dispatch, props) =>({
    searchTicker: (search, exchangeId) => dispatch(searchTicker(search, exchangeId)),
    getExchanges : () => dispatch(getExchanges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchToolbar);