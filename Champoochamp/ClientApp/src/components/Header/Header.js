import React, { Component } from "react";
import { Menu, Icon, Drawer } from "antd";

import logo from "../../assets/logo.png";
import MENU_ITEMS from "../Header/constants";

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isDrawerVisible: false,
      categoryMenu: []
    };

    fetch(
      `http://localhost:4000/api/Category/GetCategory?$filter=parent eq null`,
      { method: `GET` }
    )
      .then(response => response.json())
      .then(data => this.setState({ categoryMenu: data }))
      .catch(error => console.log(`ERROR_GetCategory: ` + error));
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

  menu = categories =>
    categories.map(category => {
      if (!category.parentId) {
        if (category.inverseParent.length > 0) {
          return (
            <Menu.SubMenu
              title={<span className="navbar-item">{category.name}</span>}
            >
              {this.menu(category.inverseParent)}
            </Menu.SubMenu>
          );
        } else {
          return <Menu.Item className="navbar-item">{category.name}</Menu.Item>;
        }
      } else if (category.inverseParent.length > 0) {
        return (
          <Menu.ItemGroup title={category.name}>
            {this.menu(category.inverseParent)}
          </Menu.ItemGroup>
        );
      } else if (category.inverseParent.length === 0) {
        return <Menu.Item>{category.name}</Menu.Item>;
      }
    });

  render() {
    const { isDrawerVisible, categoryMenu } = this.state;

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
              {this.menu(categoryMenu)}
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
