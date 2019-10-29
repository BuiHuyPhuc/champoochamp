import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { typography } from '../../../shared/principles';

const Title = styled('h3')`
  ${typography.mdTitle};
`;

class SectionTitle extends Component {
  render() {
    const { content, hasDecoration } = this.props;

    return <Title hasDecoration={hasDecoration}>{content}</Title>;
  }
}

SectionTitle.propTypes = {
  content: PropTypes.string.isRequired,
  hasDecoration: PropTypes.bool
};

export default SectionTitle;
