import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "../Header";
import RouterConfig from "../../router/RouterConfig";

class App extends Component {
    render() {        
        return (
            <Router>
                <Header></Header>
                <RouterConfig></RouterConfig>
            </Router>
        );
    }
}

export default App;