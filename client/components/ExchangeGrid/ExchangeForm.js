import React, {Component} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

import 'react-select/dist/react-select.css';
import { getExchanges, getExchange, getMarkets, clearMarkets } from './../../actions/ccxt';

//exchangeId
//isOpen
//toggle
//Save button

class ExchangeForm extends Component {
    constructor(props){
        super(props);
        this.onPropertyChange = this.onPropertyChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onDropdownChange=this.onDropdownChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state ={
            name: props.exchange ? props.exchange.name : '',
            ccxt_id: props.exchange ? props.exchange.ccxt_id:'',
            localCurrency: props.exchange ? props.exchange.localCurrency : '',
            includeIntoQuery: props.exchange ? props.exchange.includeIntoQuery : '',
            symbols: props.exchange ? props.exchange.symbols : [],
            dropdownSymbols: props.exchange ? props.exchange.symbols.map(symbol=>({value:symbol, label:symbol})) : []
        }
    }
    componentWillMount(){
        this.props.clearMarkets();
        this.props.getExchanges();
        if (this.state.ccxt_id){
            this.props.getMarkets(this.state.ccxt_id);
        }
    };
    onCheckboxChange(e){
        const id = e.target.id;
        const value = e.target.checked;
        const exchange = {};
        exchange[id] = value;
        this.setState(exchange);
    }
    onDropdownChange(value){
        const symbols = value.map(symbol=>symbol.value);
        this.setState({symbols, dropdownSymbols: value});
    }
    onPropertyChange(e){
        const id = e.target.id;
        const value = e.target.value;
        const exchange = {};
        exchange[id] = value;
        this.setState(exchange);
    }
    onSaveClick(e){
        e.preventDefault();
        if (this.props.exchange){
            this.props.onSubmit(this.props.exchange._id, {
                name: this.state.name,
                ccxt_id: this.state.ccxt_id,
                localCurrency: this.state.localCurrency,
                includeIntoQuery: this.state.includeIntoQuery,
                symbols: this.state.symbols
            });
        } else {
            this.props.onSubmit({
                name: this.state.name,
                ccxt_id: this.state.ccxt_id,
                localCurrency: this.state.localCurrency,
                includeIntoQuery: this.state.includeIntoQuery,
                symbols: this.state.symbols
            });
        }        
    }
    onSelectChange(newValue){
        this.setState({'ccxt_id': newValue});
        this.props.getMarkets(newValue);
    }

    render(){
        return (
            <Form>
                <FormGroup row>
                    <Label sm={3} htmlFor="ccxt_id">CCXT-ID</Label>
                    <Col sm={9}>
                        <Select
                            id="ccxt_id"
                            name="ccxt_id"
                            options= {this.props.ccxt.exchanges.map((item)=>({value: item, label: item})) }
                            autoFocus
                            simpleValue
                            clearable = {true}
                            onChange={this.onSelectChange}
                            value={this.state.ccxt_id}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="name" sm={3}>Name</Label>
                    <Col sm={9}>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Exchange Display Name"
                            value={this.state.name}
                            onChange={this.onPropertyChange} />
                    </Col>
                </FormGroup>
                
                <FormGroup row>
                    <Label sm={3} for="localCurrency">Local Currency</Label>
                    <Col sm={9}>
                        <Input
                            type="text"
                            name="localCurrency"
                            id="localCurrency"
                            placeholder="Local Currency" 
                            value={this.state.localCurrency}
                            onChange={this.onPropertyChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="includeIntoQuery">Include Into Query</Label>
                    <Col sm={9}>                                
                        <Label sm={9}>
                            <Input
                                type="checkbox"
                                name="includeIntoQuery"
                                id="includeIntoQuery"
                                value={this.state.includeIntoQuery}
                                checked={this.state.includeIntoQuery}
                                onChange={this.onCheckboxChange} />
                        </Label>                                
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="symbols">Symbols</Label>
                    <Col sm={9}>
                        <Select.Creatable
                            multi={true}
                            onChange={this.onDropdownChange}
                            value={this.state.dropdownSymbols}
                            options = {this.props.ccxt.markets.map((item)=>({value: item, label:item}) )}                         
                        />
                    </Col>
                </FormGroup>
                <Button color="primary" onClick={this.onSaveClick}>Save</Button>{' '}
                <Button color="secondary" onClick={this.props.onCancel}>Cancel</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state, props) =>({
    ccxt: state.ccxt
});
const mapDispatchToProps = (dispatch, props) =>({
    getExchanges : () => dispatch(getExchanges()),
    getExchange : (exchangeid) => dispatch(getExchange(exchangeid)),
    getMarkets : (exchangeid) => dispatch(getMarkets(exchangeid)),
    clearMarkets : () => dispatch(clearMarkets())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);
