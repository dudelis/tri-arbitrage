import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import ExchangeForm from './ExchangeForm';
import { addExchange } from './../../actions/exchanges';

//exchangeId
//isOpen
//toggle
//Save button

const ExchangeAddModal = (props) =>(
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>New</ModalHeader>
        <ModalBody>
            <ExchangeForm
                onSubmit={(exchange)=>{
                    props.addExchange(exchange);
                    props.toggle();
                }}
                onCancel={props.toggle}
            />
        </ModalBody>
    </Modal>  
)
const mapDispatchToProps = (dispatch, props) =>({
    addExchange : (exchange) => dispatch(addExchange(exchange))
});

export default connect(null, mapDispatchToProps)(ExchangeAddModal);