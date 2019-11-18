import React, { Component } from 'react';
import styled from '@emotion/styled';

import { breakpoint } from '../../shared/principles';

import NavBarLeft from './components/NavBarLeft';
import NavBarRight from './components/NavBarRight';

const Wrapper = styled('header')`
  align-items: center;
  background: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const HeaderInner = styled('div')`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1400px;
  width: 90%;

  ${breakpoint.sm`
    height: 60px;
  `}
`;

class Header extends Component {
  render() {
    const { shoppingCartCount } = this.props;
    
    return (
      <Wrapper>
        <HeaderInner>
          <NavBarLeft />
          <NavBarRight shoppingCartCount={shoppingCartCount} />
        </HeaderInner>
      </Wrapper>
    );
  }
}

export default Header;
