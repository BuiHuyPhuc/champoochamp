import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Spin } from 'antd';
import styled from '@emotion/styled';

import { callAPI } from '../../../../shared/utils';
import { colors, typography } from '../../../../shared/principles';

const Wrapper = styled('ul')`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
`;

const Item = styled('li')`
  padding: 5px 0;
`;

const ItemLink = styled(NavLink)`
  ${typography.semiBoldText};
  display: inline-block;
  color: ${colors.black};
  font-size: 12px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${colors.gray};

  &:hover {
    border-color: ${colors.black};
    color: ${colors.black};
  }
`;

const Seperator = styled('span')`
  vertical-align: middle;
  color: ${colors.gray};
  margin: 0 7px;
`;

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.categoryId,
      isCategoryChanged: false,
      isLoading: true,
      currentCategory: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categoryId !== prevState.categoryId) {
      return {
        categoryId: nextProps.categoryId,
        isCategoryChanged: true
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { isCategoryChanged, categoryId } = this.state;

    if (isCategoryChanged) {
      this.getCategoryById(categoryId);
    }
  }

  componentDidMount() {
    this.getCategoryById(this.state.categoryId);
  }

  getCategoryById = categoryId => {
    const url = `Category/GetCategoryById-${categoryId}`;

    callAPI(url).then(res =>
      this.setState({
        isCategoryChanged: false,
        isLoading: false,
        currentCategory: res.data
      })
    );
  };

  getAllCategory = (category, objTemp) => {
    if (category) {
      if (category.parent) {
        this.getAllCategory(category.parent, objTemp);
      }
      objTemp.arrCategories.push(category);
    }
  };

  renderBreadcrumb = objTemp =>
    objTemp.arrCategories.map(category => {
      objTemp.url += `/${category.metaTitle}`;

      if (category.id === this.state.currentCategory.id) {
        return (
          <Item key={category.id}>
            <ItemLink to={`${objTemp.url}-${category.id}`}>
              {category.name}
            </ItemLink>
          </Item>
        );
      } else {
        return (
          <Item key={category.id}>
            <ItemLink to={`${objTemp.url}-${category.id}`}>
              {category.name}
            </ItemLink>
            <Seperator>/</Seperator>
          </Item>
        );
      }
    });

  render() {
    const { isLoading, currentCategory } = this.state;
    let objTemp = { url: '/san-pham', arrCategories: [] };
    this.getAllCategory(currentCategory, objTemp);

    return isLoading ? (
      <Spin />
    ) : (
      <Wrapper>
        <Item>
          <ItemLink to="/">Trang chủ</ItemLink>
          <Seperator>/</Seperator>
        </Item>
        {this.renderBreadcrumb(objTemp)}
      </Wrapper>
    );
  }
}

export default Breadcrumb;
