import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Homepage from "../components/Homepage";
import CategoryPage from "../components/CategoryPage";
import SearchPage from "../components/SearchPage";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/CartPage";
import Payment from "../components/PaymentPage";

class RouterConfig extends Component {
  render() {
    const { getShoppingCartCount } = this.props;
    const user = {
      Email: 'buihuyphuc97@gmail.com',
      FirstName: 'Bùi Huy',
      LastName: 'Phúc',
      Telephone: '0914659369',
      CreatedDate: '2019-11-08'
    };
    //const user = null;

    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/san-pham/:lv1?/:lv2?/:lv3?" component={CategoryPage} />
        <Route path="/tim-kiem/:key?" component={SearchPage} />
        <Route path="/chi-tiet/:product" render={(props) =>
          (<ProductDetail {...props} user={user} getShoppingCartCount={getShoppingCartCount} />)
        }
        />
        <Route path="/gio-hang" render={(props) =>
          (<Cart {...props} user={user} getShoppingCartCount={getShoppingCartCount} />)
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