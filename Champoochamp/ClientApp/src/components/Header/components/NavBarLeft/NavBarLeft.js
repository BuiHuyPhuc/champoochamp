/** @jsx jsx */
import { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

import { callAPI } from '../../../../shared/utils';
import { breakpoint, typography, colors } from '../../../../shared/principles';
import logo from '../../../../assets/logo.png';

import { Image } from '../../../elements';

const Logo = styled('div')`
  display: inline-block;
  margin-right: 30px;
  vertical-align: middle;
  width: 130px;

  ${breakpoint.sm`
    width: 110px;
  `}
`;

const menuStyle = css`
  border: none;
  display: inline-block;
  vertical-align: middle;

  .ant-menu-submenu {
    border-bottom: 3px solid transparent;

    &:active,
    &:focus,
    &:hover {
      border-bottom: 3px solid ${colors.black};
      outline: none;
    }

    .ant-menu-submenu-title {
      padding: 0 15px;
    }
  }

  ${breakpoint.lg`
    display: none;
  `}
`;

const MenuItemTitle = styled('span')`
  ${typography.body};
  letter-spacing: 1px;
`;

const menuItemGroupStyle = css`
  .ant-menu-item {
    background: none !important;

    &:hover {
      background: ${colors.lightGray} !important;
      border: none;
      outline: none;
    }

    & > a {
      color: ${colors.darkGray};

      &:hover {
        color: ${colors.black};
      }
    }
  }
`;

class NavBarLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryMenu: []
    };
  }

  componentDidMount() {
    callAPI(`Category/GetAllCategories`, `?$filter=parent eq null`).then(res =>
      this.setState({
        categoryMenu: res.data
      })
    );
  }

  renderMenu = (categories, url) =>
    categories.map(category => {
      if (!category.parentId) {
        return (
          <Menu.SubMenu
            key={category.id}
            title={<MenuItemTitle>{category.name}</MenuItemTitle>}
          >
            {this.renderMenu(
              category.inverseParent,
              `${url}/${category.metaTitle}`
            )}
          </Menu.SubMenu>
        );
      } else if (category.inverseParent.length > 0) {
        return (
          <Menu.ItemGroup
            key={category.id}
            title={category.name}
            css={menuItemGroupStyle}
          >
            {this.renderMenu(
              category.inverseParent,
              `${url}/${category.metaTitle}`
            )}
          </Menu.ItemGroup>
        );
      } else if (category.inverseParent.length === 0) {
        return (
          <Menu.Item key={category.id}>
            <NavLink to={`${url}/${category.metaTitle}-${category.id}`}>
              {category.name}
            </NavLink>
          </Menu.Item>
        );
      }

      return true;
    });

  render() {
    const { categoryMenu } = this.state;

    return (
      <div>
        <Logo>
          <NavLink to="/">
            <Image imageUrl={logo} alt="logo" />
          </NavLink>
        </Logo>
        <Menu mode="horizontal" css={menuStyle}>
          {this.renderMenu(categoryMenu, '/san-pham')}
        </Menu>
      </div>
    );
  }
}

export default withRouter(NavBarLeft);
