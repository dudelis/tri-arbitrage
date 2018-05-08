import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { logFind } from './../../selectors/logs';
import { setSelectedItems } from './../../actions/exchanges';

//isOpen
//toggle
//Save button

class LogModal extends Component{
    constructor(props, context){
        super(props, context);
    }
    onChange(){
    }

    render(){
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="lg">
                <ModalHeader toggle={this.props.toggle}>Log</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="_id">ID:</Label>
                            <Input id="_id" type="text" onChange={this.onChange} value={this.props.logItem ? this.props.logItem._id:'' }></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="timestamp">Timestamp:</Label>
                            <Input id="timestamp" type="text" onChange={this.onChange} value={this.props.logItem ? this.props.logItem.timestamp:'' }></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="level">Level:</Label>
                            <Input id="level" type="text" onChange={this.onChange} value={this.props.logItem ? this.props.logItem.level:'' }></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="message">Message:</Label>
                            <Input id="message" type="text" onChange={this.onChange} value={this.props.logItem ? this.props.logItem.message:'' }></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="meta">Meta:</Label>
                            <Input
                                type="textarea"
                                name="text"
                                id="meta"
                                rows="15" 
                                value={this.props.isOpen ? JSON.stringify(this.props.logItem.meta, undefined, 2):'' }
                                onChange = {()=>{}}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>  
        )
    }
}
const mapStateToProps = (state, props) =>({
    logItem: logFind(state.logs.data, state.logs.selectedItems[0])
});

export default connect(mapStateToProps)(LogModal);