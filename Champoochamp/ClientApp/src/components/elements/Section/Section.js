import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { breakpoint } from '../../../shared/principles';

const Wrapper = styled('div')`
  padding: 30px 0;

  ${breakpoint.md`
    padding: 20px 0;
  `}
`;

class Section extends Component {
  render() {
    const { children } = this.props;

    return <Wrapper >{children}</Wrapper>;
  }
}

Section.propsTypes = {
  children: PropTypes.element.isRequired,
};

export default Section;
