import React, { Component } from "react";
import { Menu, Icon, Drawer } from "antd";

import logo from "../../assets/logo.png";
import MENU_ITEMS from "../Header/constants";

class Header extends Component {
  state = {
    isDrawerVisible: false
  };

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
    return (
      <header className="header-wrapper">
        <div className="container navbar">
          <div className="navbar-left">
            <div className="navbar-brand">
              <a href="/" rel="noopener noreferrer">
                <img src={logo} alt="logo" />
              </a>
            </div>

            <Menu className="navbar-nav collapse-menu" mode="horizontal">
              {MENU_ITEMS.map(item => {
                if (item.isDropdownMenu) {
                  return (
                    <Menu.SubMenu
                      title={<span className="navbar-item">{item.name}</span>}
                    >
                      <Menu.ItemGroup title="Quần">
                        <Menu.Item>Quần jeans</Menu.Item>
                        <Menu.Item>Quần kaki</Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup title="Áo">
                        <Menu.Item>Áo sơ mi</Menu.Item>
                        <Menu.Item>Áo thun</Menu.Item>
                      </Menu.ItemGroup>
                    </Menu.SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item className="navbar-item">{item.name}</Menu.Item>
                  );
                }
              })}
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
            visible={this.state.isDrawerVisible}
          >
            <Menu className="navbar-nav" mode="inline">
              {MENU_ITEMS.map(item => {
                if (item.isDropdownMenu) {
                  return (
                    <Menu.SubMenu
                      title={<span className="navbar-item">{item.name}</span>}
                    >
                      <Menu.ItemGroup title="Quần">
                        <Menu.Item>Quần jeans</Menu.Item>
                        <Menu.Item>Quần kaki</Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup title="Áo">
                        <Menu.Item>Áo sơ mi</Menu.Item>
                        <Menu.Item>Áo thun</Menu.Item>
                      </Menu.ItemGroup>
                    </Menu.SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item className="navbar-item">{item.name}</Menu.Item>
                  );
                }
              })}
            </Menu>
          </Drawer>
        </div>
      </header>
    );
  }
}

export default Header;
