import React, {Component} from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import AccumulatedArbitrageGrid from './AccumulatedArbitrageGrid';
import ConvertedOrderbookGrid from './ConvertedOrderbookGrid';


export default class TabsView extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: '1'
      };
    }
  
    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
    render() {
      return (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Accumulated Arbitrage
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Converted Orderbook
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <AccumulatedArbitrageGrid />
            </TabPane>
            <TabPane tabId="2">
                {this.state.activeTab==='2' && <ConvertedOrderbookGrid />}
            </TabPane>
          </TabContent>
        </div>
      );
    }
  }