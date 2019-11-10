import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import { colors } from '../../../../../../../../shared/principles';

const Wrapper = styled('button')`
  background: ${colors.black};
  border: none;
  cursor: pointer;
  display: inline-block;
  outline: none;
  margin: 0 8px 8px 0;
  padding: 5px 10px;
  text-align: left;

  svg {
    fill: ${colors.white};
  }
`;

const Content = styled('span')`
  color: ${colors.white};
  margin-left: 5px;
`;

class SelectedFilter extends Component {
  getItem = (group, filterItem, callback) => {
    callback(group, filterItem);
  };

  render() {
    const { group, filterItem, title, callback } = this.props;

    return (
      <Wrapper onClick={() => this.getItem(group, filterItem, callback)}>
        <Icon type="close" />
        <Content>{title}</Content>
      </Wrapper>
    );
  }
}

SelectedFilter.propsTypes = {
  group: PropTypes.string,
  filterItem: PropTypes.object,
  title: PropTypes.string.isRequired,
  callback: PropTypes.func
};

export default SelectedFilter;
