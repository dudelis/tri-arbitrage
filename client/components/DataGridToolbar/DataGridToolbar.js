import React from 'react';
import { Button, Container, InputGroup, InputGroupAddon, InputGroupText, Form,FormGroup,Col, Input, Row   } from 'reactstrap';

class DataGridToolbar extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
      return (
        <Container fluid className="grid-toolbar">
            <Row>
                <Col xs="1">
                    <Button outline color="primary" onClick={this.props.handleRefreshClick}><i className="fa fa-refresh"></i>{'\u00A0'}Refresh</Button>
                </Col>
                {this.props.handleInputChange && 
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
                                onChange={this.props.handleInputChange}/>
                        </InputGroup>
                    </Col>
                }
            </Row>
        </Container>
      );
    }
}

export default DataGridToolbar;