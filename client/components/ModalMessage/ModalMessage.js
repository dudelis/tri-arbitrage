import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

//title
//body
//show

class ModalMessage extends Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            show: props.show
        };
    }

    render(){
        return (
            <Modal isOpen={this.state.show} toggle={this.props.handleClose}>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody>{this.props.body}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.handleClose}>Ok</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ModalMessage;