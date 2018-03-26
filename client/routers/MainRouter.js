import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Full from '../containers/Full';

//Pages
import Page404 from '../views/Page404';


const AppRouter = () =>(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={Full} exact/>
                <Route path="/dashboard" component={Full} exact/>
                <Route path="/admin/exchange" component={Full} exact/>
                <Route path="/admin/fiat" component={Full} exact/>
                <Route component={Page404} />
            </Switch>
        </div>
        
    </BrowserRouter>
);

export default AppRouter;