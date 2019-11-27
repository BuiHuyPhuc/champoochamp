import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { typography } from '../../../shared/principles';

const Title = styled('h3')`
  ${typography.mdTitle};
`;

class SectionTitle extends Component {
  render() {
    const { content } = this.props;

    return <Title>{content}</Title>;
  }
}

SectionTitle.propTypes = {
  content: PropTypes.string.isRequired
};

export default SectionTitle;
