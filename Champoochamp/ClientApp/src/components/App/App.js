import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "../Header";
import RouterConfig from "../../router/RouterConfig";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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