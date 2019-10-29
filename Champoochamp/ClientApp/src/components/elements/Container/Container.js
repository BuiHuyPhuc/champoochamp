import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Wrapper = styled('div')`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
`;

class Container extends Component {
  render() {
    const { children } = this.props;

    return <Wrapper>{children}</Wrapper>;
  }
}

Container.propsTypes = {
  children: PropTypes.element.isRequired
};

export default Container;
