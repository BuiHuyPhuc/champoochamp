import React, { Component } from 'react';
import { Icon, Drawer } from 'antd';
import styled from '@emotion/styled';

import { callAPI } from '../../../../shared/utils';
import { breakpoint } from '../../../../shared/principles';

import SearchBar from '../SearchBar';
import ShoppingCartHeader from './components/ShoppingCartHeader';

const Wrapper = styled('div')`
  align-items: center;
  display: flex;
`;

const MenuItem = styled('div')`
  padding: 10px 15px;

  &:last-child {
    padding: 0;
  }

  &:nth-last-child(2) {
    padding-right: 0;
  }

  ${breakpoint.lg`
    &:last-child {
      padding: 10px 0 10px 15px;
    }

    &:nth-last-child(2){
      padding: 10px 15px;
    }
  `}
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
      isDrawerVisible: false,
      searchData: []
    };
  }

  componentDidMount() {
    callAPI(`Search/GetSearchData`).then(res =>
      this.setState({ searchData: res.data })
    );
  }

  onShowDrawer = () => {
    this.setState({
      isDrawerVisible: true
    });
  };

  onCloseDrawer = () => {
    this.setState({
      isDrawerVisible: false
    });
  };

  render() {
    const { isDrawerVisible, searchData } = this.state;

    return (
      <Wrapper>
        <MenuItem>
          <SearchBar suggestions={searchData} history={this.props.history} />
        </MenuItem>
        <MenuItem title="Giỏ hàng">
          <ShoppingCartHeader />
        </MenuItem>
        <MenuItem title="Đăng nhập">
          <Icon type="user" />
        </MenuItem>
        <MenuItem>
          <CollapseMenuButton type="menu" onClick={this.onShowDrawer} />
        </MenuItem>

        <Drawer
          placement="right"
          closable={false}
          onClose={this.onCloseDrawer}
          visible={isDrawerVisible}
        >
          <SearchBar suggestions={searchData} history={this.props.history} />
        </Drawer>
      </Wrapper>
    );
  }
}

export default NavBarRight;
