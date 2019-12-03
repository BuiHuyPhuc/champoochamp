import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import listensToClickOutside from 'react-onclickoutside';
import { Icon } from 'antd';
import styled from '@emotion/styled';

import { colors } from '../../../../../../shared/principles';

const Wrapper = styled('div')`
  position: relative;
`;

const UserIcon = styled(Icon)`
  cursor: pointer;
`;

const UserAvatar = styled('div')`
  background-image: url("${props => props.url}");
  background-position: center;
  background-size: contain;
  border-radius: 25px;
  cursor: pointer;
  height: 25px;
  width: 25px;
`;

const Panel = styled('div')`
  background: ${colors.white};
  border: solid 1px ${colors.gray};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
  padding: 5px 0;
  position: absolute;
  right: 0;
  top: 120%;
  width: 200px;
  z-index: 100;
`;

const ActionItem = styled('div')`
  color: ${colors.black};
  cursor: pointer;
  padding: 10px 20px;

  &:hover {
    background: ${colors.lightGray};
  }
`;

class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showPanel: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user !== prevState.user) {
      return {
        user: nextProps.user
      };
    }

    return null;
  }

  onShowPanel = () => {
    this.setState({
      showPanel: true
    });
  };

  onHidePanel = () => {
    this.setState({
      showPanel: false
    });
  };

  handleClickOutside = () => {
    this.onHidePanel();
  };

  render() {
    const { onLogout } = this.props;
    const { showPanel, user } = this.state;

    return (
      <Wrapper>
        {user ? (
          <UserAvatar
            onClick={this.onShowPanel}
            url="https://bit.ly/2OKSVnB"
            title="Tài khoản"
          />
        ) : (
          <UserIcon
            onClick={this.onShowPanel}
            title="Đăng nhập / Đăng kí"
            type="user"
          />
        )}

        {showPanel && (
          <Panel>
            {user ? (
              <Fragment>
                <NavLink to="/tai-khoan">
                  <ActionItem onClick={this.onHidePanel}>Tài khoản</ActionItem>
                </NavLink>
                <ActionItem
                  onClick={() => {
                    this.onHidePanel();
                    onLogout();
                  }}
                >
                  Đăng xuất
                </ActionItem>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink to="/dang-nhap">
                  <ActionItem onClick={this.onHidePanel}>Đăng nhập</ActionItem>
                </NavLink>
                <NavLink to="/dang-ki">
                  <ActionItem onClick={this.onHidePanel}>Đăng kí</ActionItem>
                </NavLink>
              </Fragment>
            )}
          </Panel>
        )}
      </Wrapper>
    );
  }
}

export default listensToClickOutside(UserHeader);
