import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Homepage from "../components/Homepage";
import CategoryPage from "../components/CategoryPage";
import CollectionPage from "../components/CollectionPage";
import SearchPage from "../components/SearchPage";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/CartPage";
import Payment from "../components/PaymentPage";

class RouterConfig extends Component {
  render() {
    const { user, updateCartTotalQuantity } = this.props;    

    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/san-pham/:lv1?/:lv2?/:lv3?" component={CategoryPage} />
        <Route path="/bo-suu-tap/:collection" component={CollectionPage} />
        <Route path="/tim-kiem/:key?" component={SearchPage} />
        <Route path="/chi-tiet/:product" render={(props) =>
          (<ProductDetail {...props} user={user} updateCartTotalQuantity={updateCartTotalQuantity} />)
        }
        />
        <Route path="/gio-hang" render={(props) =>
          (<Cart {...props} user={user} updateCartTotalQuantity={updateCartTotalQuantity} />)
        }
        />
        <Route path="/thanh-toan" render={(props) =>
          (<Payment {...props} user={user} />)
        }
        />
        <Route component={Homepage} />
      </Switch>
    );
  }
}

export default RouterConfig;