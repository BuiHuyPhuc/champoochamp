import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Homepage from '../components/Homepage';
import CategoryPage from '../components/CategoryPage';
import CollectionPage from '../components/CollectionPage';
import SearchPage from '../components/SearchPage';
import ProductDetail from '../components/ProductDetail';
import Cart from '../components/CartPage';
import CheckoutPage from '../components/CheckoutPage';
import LoginAdminPage from '../components/LoginAdminPage';
import AdminPage from '../components/AdminPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import ForgetPasswordPage from '../components/ForgetPasswordPage';

class RouterConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginAdminSuccess: false,
      discount: null,
      strShoppingCart: props.strShoppingCart
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.strShoppingCart !== prevState.strShoppingCart) {
      return {
        strShoppingCart: nextProps.strShoppingCart
      };
    }

    return null;
  }

  onLoginAdmin = isLoginAdminSuccess => {
    this.setState({ isLoginAdminSuccess });
  };

  getDiscount = discount => {
    this.setState({ discount });
  };

  render() {
    const { isLoginAdminSuccess, discount, strShoppingCart } = this.state;
    const {
      onRenderCart,
      onRenderMenu,
      user,     
      updateShoppingCart,
      getLoginUser,
      history
    } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route
          path="/dang-nhap"
          render={props => <LoginPage {...props} getLoginUser={getLoginUser} />}
        />
        <Route
          path="/dang-ki"
          render={props => (
            <RegisterPage
              {...props}
              history={history}
            />
          )}
        />
        <Route
          path="/quen-mat-khau"
          render={props => (
            <ForgetPasswordPage
              {...props}
              history={history}
            />
          )}
        />
        <Route path="/san-pham/:lv1?/:lv2?/:lv3?" component={CategoryPage} />
        <Route path="/bo-suu-tap/:collection" component={CollectionPage} />
        <Route path="/tim-kiem/:key?" component={SearchPage} />
        <Route
          path="/chi-tiet/:product"
          render={props => (
            <ProductDetail
              {...props}
              user={user}
              strShoppingCart={strShoppingCart}
              updateShoppingCart={updateShoppingCart}
              onRenderCart={onRenderCart}
            />
          )}
        />
        <Route
          path="/gio-hang"
          render={props => 
            strShoppingCart ?               
              <Cart
                {...props}
                user={user}
                strShoppingCart={strShoppingCart}
                updateShoppingCart={updateShoppingCart}
                getDiscount={this.getDiscount}
              />              
              :
              history.push('/')            
          }
        />
        <Route
          path="/thanh-toan"
          render={props => 
            strShoppingCart ?
              <CheckoutPage
                {...props}
                user={user}
                updateShoppingCart={updateShoppingCart}
                discount={discount}
                getDiscount={this.getDiscount}
                history={history}
              />
              :
              history.push('/')
          }
        />
        <Route
          path="/admin/dang-nhap"
          render={props => (
            <LoginAdminPage
              {...props}
              onRenderMenu={onRenderMenu}
              onLoginAdmin={this.onLoginAdmin}
              isLoginAdminSuccess={isLoginAdminSuccess}
              history={history}
            />
          )}
        />
        <Route
          path="/admin"
          render={props => (
            <AdminPage
              {...props}
              isLoginAdminSuccess={isLoginAdminSuccess}
              history={history}
            />
          )}
        />
        <Route component={Homepage} />
      </Switch>
    );
  }
}

export default withRouter(RouterConfig);
