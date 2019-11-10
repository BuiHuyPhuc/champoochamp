import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Wrapper = styled('button')`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  margin: 5px 0;
  text-align: left;
`;

const Content = styled('span')`
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

class SingleFilter extends Component {
  getItem = (group, filterItem, callback) => {
    callback(group, filterItem);
  };

  render() {
    const { group, filterItem, title, callback } = this.props;

    return (
      <Wrapper onClick={() => this.getItem(group, filterItem, callback)}>
        <Content>{title}</Content>
      </Wrapper>
    );
  }
}

SingleFilter.propsTypes = {
  group: PropTypes.string,
  filterItem: PropTypes.object,
  title: PropTypes.string.isRequired,
  callback: PropTypes.func
};

export default SingleFilter;
