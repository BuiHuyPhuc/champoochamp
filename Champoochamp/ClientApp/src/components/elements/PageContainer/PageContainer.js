import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { breakpoint } from '../../../shared/principles';

const Wrapper = styled('div')`
  width: 90%;
  max-width: 1400px;
  margin: 80px auto 0 auto;

  ${breakpoint.sm`
    margin: 60px auto 0 auto;
  `}
`;

class PageContainer extends Component {
  render() {
    const { children } = this.props;

    return <Wrapper>{children}</Wrapper>;
  }
}

PageContainer.propsTypes = {
  children: PropTypes.element.isRequired
};

export default PageContainer;
