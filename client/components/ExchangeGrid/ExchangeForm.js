import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

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
        this.state ={
            name: props.exchange ? props.exchange.name : '',
            ccxt_id: props.exchange ? props.exchange.ccxt_id:'',
            localCurrency: props.exchange ? props.exchange.localCurrency : '',
            includeIntoQuery: props.exchange ? props.exchange.includeIntoQuery : ''
        }
    }
    onCheckboxChange(e){
        const id = e.target.id;
        const value = e.target.checked;
        const exchange = {};
        exchange[id] = value;
        this.setState(exchange);
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
                includeIntoQuery: this.state.includeIntoQuery
            });
        } else {
            this.props.onSubmit({
                name: this.state.name,
                ccxt_id: this.state.ccxt_id,
                localCurrency: this.state.localCurrency,
                includeIntoQuery: this.state.includeIntoQuery
            });
        }
        
    }

    render(){
        return (
            <Form>
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
                    <Label sm={3} htmlFor="ccxt_id">CCXT-ID</Label>
                    <Col sm={9}>
                        <Input
                            type="text"
                            name="ccxt_id"
                            id="ccxt_id"
                            placeholder="CCXT-ID" 
                            value={this.state.ccxt_id}
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
                
                <Button color="primary" onClick={this.onSaveClick}>Save</Button>{' '}
                <Button color="secondary" onClick={this.props.onCancel}>Cancel</Button>
            </Form>
        )
    }
}
export default ExchangeForm;