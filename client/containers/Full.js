import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './../components/Header';
import Sidebar from './../components/Sidebar/Sidebar';
import { Container } from 'reactstrap';

//views
import Dashboard from './../views/Dashboard';
import ExchangeView from '../views/admin/ExchangeView';
import FiatView from './../views/admin/FiatView';
import LogView from './../views/admin/LogView';
import TickerView from './../views/admin/TickerView';
import SimpleArbitrageView from './../views/arbitrage/SimpleArbitrageView';
import WeightedArbitrageView from './../views/arbitrage/WeightedArbitrageView';
import AccumulatedArbitrageView from './../views/arbitrage/AccumulatedArbitrageView';


class Full extends Component {
    render(){
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Container fluid>
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                <Route path="/admin/exchange" name="Exchanges" component={ExchangeView}/>
                                <Route path="/admin/fiat" name="Fiat" component={FiatView}/>
                                <Route path="/admin/ticker" name="Tickers" component={TickerView}/>
                                <Route path="/admin/log" name="Logs" component={LogView}/>
                                <Route path="/arbitrage/simple" name="Simple" component={SimpleArbitrageView}/>
                                <Route path="/arbitrage/weighted" name="Weighted" component={WeightedArbitrageView}/>
                                <Route path="/arbitrage/accumulated" name="Accumulated" component={AccumulatedArbitrageView}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                </div>
            </div>
        );
    }
}

export default Full;