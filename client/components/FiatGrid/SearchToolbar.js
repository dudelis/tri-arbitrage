import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, InputGroup, InputGroupAddon, InputGroupText, Form,FormGroup,Col, Input, Row   } from 'reactstrap';
import { setSearchFilter } from './../../actions/fiats';

class SearchToolbar extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
        
    }

    handleChange(e){
        const tbx = document.getElementById('grid-search-input');
        this.props.setSearchFilter(tbx.value);
    }
    handleRefreshClick(){
        const tbx = document.getElementById('grid-search-input');
        tbx.value='';
        this.props.setSearchFilter('');
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
            </Row>
        </Container>
      );
    }
}

const mapStateToProps = (state) =>{
    return {
        searchFilters: state.fiats.searchFilter
    }
}

const mapDispatchToProps = (dispatch, props) =>({
    setSearchFilter: (search) => dispatch(setSearchFilter(search))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchToolbar);