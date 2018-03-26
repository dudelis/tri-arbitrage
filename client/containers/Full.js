import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './../components/Header';
import Sidebar from './../components/Sidebar/Sidebar';
import { Container } from 'reactstrap';

//views
import Dashboard from './../views/Dashboard';
import ExchangeView from '../views/admin/ExchangeView';
import FiatView from './../views/admin/FiatView';


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