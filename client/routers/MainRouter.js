import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import Full from '../containers/Full';

//Pages
import Page404 from '../views/Page404';


const AppRouter = () =>(
    <HashRouter>
            <Switch>
                <Route path="/" component={Full} exact/>
                <Route path="/dashboard" component={Full} exact/>
                <Route path="/admin/exchange" component={Full} exact/>
                <Route path="/admin/fiat" component={Full} exact/>
                <Route path="/admin/log" component={Full} exact/>
                <Route path="/admin/ticker" component={Full} exact/>
                <Route path="/arbitrage/simple" component={Full} exact/>
                <Route component={Page404} />
            </Switch>        
    </HashRouter>
);

export default AppRouter;

