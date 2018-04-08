import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

import ExchangeForm from './ExchangeForm';
import { updateExchange } from './../../actions/exchanges';

//exchangeId
//isOpen
//toggle
//Save button

const ExchangeEditModal = (props) =>(
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Edit</ModalHeader>
        <ModalBody>
            <ExchangeForm
                exchange={props.exchange}
                onSubmit={(id, exchange)=>{
                    props.updateExchange(id, exchange);
                    props.toggle();
                }}
                onCancel={props.toggle}

            />
        </ModalBody>
    </Modal>  
)
const mapDispatchToProps = (dispatch, props) =>({
    updateExchange : (id, exchange) => dispatch(updateExchange(id, exchange))
});

export default connect(null, mapDispatchToProps)(ExchangeEditModal);