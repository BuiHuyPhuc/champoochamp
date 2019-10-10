import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon, Drawer, Spin } from "antd";

import CallAPI from "../../shared/utils/CallAPI";
import logo from "../../assets/logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerVisible: false,
      isLoading: true,
      categoryMenu: []
    };
  }

  componentDidMount() {
    const url = `Category/GetAllCategories`;
    const query = `?$filter=parent eq null`;

    CallAPI(url, query).then(res => this.setState({
      isLoading: false,
      categoryMenu: res.data
    }));
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

  menu = (categories, url) => categories.map(category => {
    if (!category.parentId) {
      return (
        <Menu.SubMenu key={category.id} title={<span className="navbar-item">{category.name}</span>}>
          {this.menu(category.inverseParent, `${url}/${category.metaTitle}`)}
        </Menu.SubMenu>
      )
    }
    else if (category.inverseParent.length > 0) {
      return (
        <Menu.ItemGroup key={category.id} title={category.name}>
          {this.menu(category.inverseParent, `${url}/${category.metaTitle}`)}
        </Menu.ItemGroup>
      );
    }
    else if (category.inverseParent.length === 0) {
      return (
        <Menu.Item key={category.id}>
          <NavLink to={`${url}/${category.metaTitle}-${category.id}`}>{category.name}</NavLink>
        </Menu.Item>
      );
    }

    return true;
  })

  render() {
    const { isDrawerVisible, isLoading, categoryMenu } = this.state;

    if (isLoading) {
      return (
        <header className="header-wrapper">
          <div className="container navbar"><Spin /></div>
        </header>
      );
    }
    
    return (
      <header className="header-wrapper">
        <div className="container navbar">
          <div className="navbar-left">
            <div className="navbar-brand">
              <NavLink className="breadcrumb-link" to="/">
                <img src={logo} alt="logo" />
              </NavLink>
            </div>

            <Menu className="navbar-nav collapse-menu" mode="horizontal">
              {this.menu(categoryMenu, "/san-pham")}
            </Menu>
          </div>

          <div className="navbar-right">
            <Menu className="navbar-nav" mode="horizontal">
              <Menu.Item className="navbar-item">
                <Icon type="search"></Icon>
              </Menu.Item>
              <Menu.Item className="navbar-item">
                <Icon type="shopping"></Icon>
              </Menu.Item>
              <Menu.Item className="navbar-item menu-button">
                <Icon type="menu" onClick={this.onShowDrawer}></Icon>
              </Menu.Item>
            </Menu>
          </div>

          <Drawer
            className="drawer-menu"
            placement="right"
            closable={false}
            onClose={this.onCloseDrawer}
            visible={isDrawerVisible}
          >
            <Menu className="navbar-nav" mode="inline">
              {this.menu(categoryMenu, "/san-pham")}
            </Menu>
          </Drawer>
        </div>
      </header>
    );
  }
}

export default Header;
