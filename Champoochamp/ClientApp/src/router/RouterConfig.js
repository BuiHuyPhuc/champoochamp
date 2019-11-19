import React, { Component } from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import Homepage from "../components/Homepage";
import CategoryPage from "../components/CategoryPage";
import CollectionPage from "../components/CollectionPage";
import SearchPage from "../components/SearchPage";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/CartPage";
import Payment from "../components/PaymentPage";
import LoginAdminPage from "../components/LoginAdminPage";
import AdminPage from "../components/AdminPage";

class RouterConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginAdminSuccess: false
    };
  }

  onLoginAdmin = isLoginAdminSuccess => {
    this.setState({ isLoginAdminSuccess });
  }

  render() {
    const { isLoginAdminSuccess } = this.state;    
    const { onRenderMenu, user, updateCartTotalQuantity, history } = this.props;
    
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/san-pham/:lv1?/:lv2?/:lv3?" component={CategoryPage} />
        <Route path="/bo-suu-tap/:collection" component={CollectionPage} />
        <Route path="/tim-kiem/:key?" component={SearchPage} />
        <Route path="/chi-tiet/:product" render={props =>
          (<ProductDetail {...props} user={user} updateCartTotalQuantity={updateCartTotalQuantity} />)
        }
        />
        <Route path="/gio-hang" render={props =>
          (<Cart {...props} user={user} updateCartTotalQuantity={updateCartTotalQuantity} />)
        }
        />
        <Route path="/thanh-toan" render={props =>
          (<Payment {...props} user={user} />)
        }
        />
        <Route path="/admin/dang-nhap" render={props =>
          (<LoginAdminPage {...props}
            onRenderMenu={onRenderMenu}
            onLoginAdmin={this.onLoginAdmin}
            isLoginAdminSuccess={isLoginAdminSuccess}
            history={history}
          />)
        }
        />
        <Route path='/admin' render={props =>
          (<AdminPage {...props} isLoginAdminSuccess={isLoginAdminSuccess} history={history} />)
        }
        />
        <Route component={Homepage} />
      </Switch>
    );
  }
}

export default withRouter(RouterConfig);