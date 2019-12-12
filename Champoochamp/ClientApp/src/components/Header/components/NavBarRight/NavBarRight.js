import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Drawer, notification } from 'antd';
import styled from '@emotion/styled';

import { callAPI, setCookie } from '../../../../shared/utils';
import { breakpoint } from '../../../../shared/principles';
import { localStorageKey, time } from '../../../../shared/constants';

import SearchBar from '../SearchBar';
import CartSummary from './components/CartSummary';
import ShoppingCartHeader from './components/ShoppingCartHeader';
import UserHeader from './components/UserHeader';

const Wrapper = styled('div')`
  align-items: center;
  display: flex;
`;

const MenuItem = styled('div')`
  padding: 10px 15px;

  &:last-child {
    padding: 0;
  }

  &:nth-last-of-type(2) {
    padding-right: 0;
  }

  ${breakpoint.lg`
    &:last-child {
      padding: 10px 0 10px 15px;
    }

    &:nth-last-of-type(2){
      padding: 10px 15px;
    }
  `}
`;

const CartDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    max-width: 425px;
    width: 100vw !important;

    .ant-drawer-body {
      padding: 0;
    }
  }
`;

const CollapseMenuButton = styled(Icon)`
  display: none !important;

  ${breakpoint.lg`
    display: inline-block !important;
  `}
`;

class NavBarRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuDrawerVisible: false,
      isCartDrawerVisible: false,
      searchData: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isCartDrawerVisible && nextProps.isCartDrawerVisible) {
      return {
        isCartDrawerVisible: true
      };
    }

    return null;
  }

  componentDidMount() {
    callAPI(`Search/GetSearchData`).then(res =>
      this.setState({ searchData: res.data })
    );
  }

  onShowDrawer = drawerType => {
    this.setState({
      [drawerType]: true
    });
  };

  onCloseDrawer = drawerType => {
    this.props.onRenderCart(false);
    this.setState({
      [drawerType]: false
    });
  };

  onLogout = () => {
    setCookie(localStorageKey.emailKey, '', -1);
    setCookie(localStorageKey.passwordKey, '', -1);
    this.props.getLoginUser(null);
    notification.info({
      message: 'Đăng xuất thành công!',
      placement: 'topRight',
      onClick: () => notification.destroy(),
      duration: time.durationNotification
    });
  };

  render() {
    const { user, strShoppingCart, updateShoppingCart, history } = this.props;
    const { isMenuDrawerVisible, isCartDrawerVisible, searchData } = this.state;

    return (
      <Wrapper>
        <MenuItem>
          <SearchBar suggestions={searchData} history={history} />
        </MenuItem>
        <MenuItem>
          <ShoppingCartHeader
            strShoppingCart={strShoppingCart}
            onShowDrawer={() => this.onShowDrawer('isCartDrawerVisible')}
          />
        </MenuItem>
        <MenuItem>
          <UserHeader user={user} onLogout={this.onLogout} />
        </MenuItem>
        <MenuItem>
          <CollapseMenuButton
            type="menu"
            onClick={() => this.onShowDrawer('isMenuDrawerVisible')}
          />
        </MenuItem>

        <Drawer
          placement="right"
          closable={false}
          onClose={() => this.onCloseDrawer('isMenuDrawerVisible')}
          visible={isMenuDrawerVisible}
        >
          <SearchBar suggestions={searchData} history={history} />
        </Drawer>

        <CartDrawer
          placement="right"
          closable={false}
          onClose={() => this.onCloseDrawer('isCartDrawerVisible')}
          visible={isCartDrawerVisible}
        >
          <CartSummary
            user={user}
            strShoppingCart={strShoppingCart}
            updateShoppingCart={updateShoppingCart}
            onCloseDrawer={() => this.onCloseDrawer('isCartDrawerVisible')}
          />
        </CartDrawer>
      </Wrapper>
    );
  }
}

export default withRouter(NavBarRight);
