import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalDelete extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Modal isOpen={this.props.modalDelete} toggle={this.props.toggleModalDelete}>
                <ModalHeader toggle={this.props.toggleModalDelete}>Delete</ModalHeader>
                <ModalBody>
                    Are you sure you would like to delete the item?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.confirmModalDelete}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleModalDelete}>Cancel</Button>
                </ModalFooter>
            </Modal>  
        )
    }
}

export default ModalDelete;