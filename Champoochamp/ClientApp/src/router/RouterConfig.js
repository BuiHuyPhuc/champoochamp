import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Homepage from "../components/Homepage";
import CategoryPage from "../components/CategoryPage";

class RouterConfig extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/san-pham/:lv1?/:lv2?/:lv3?" component={CategoryPage} />
                <Route component={Homepage} />
            </Switch>
        );
    }
}

export default RouterConfig;