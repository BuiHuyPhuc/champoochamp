import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Drawer } from "antd";
import { API_PORT } from '../../shared/constants.js';


import logo from "../../assets/logo.png";
import MENU_ITEMS from "../Header/constants";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isDrawerVisible: false,
            categoryMenu: []
        };        
    }

    componentDidMount() {
        fetch(`${API_PORT}/api/Category/GetCategory?$filter=parent eq null`, { method: `GET` })
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
        const { isDrawerVisible, categoryMenu } = this.state;
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
