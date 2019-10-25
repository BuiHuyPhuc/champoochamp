import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Spin } from "antd";

import { callAPI } from "../../../../shared/utils";

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

    callAPI(url).then(res => this.setState({
      isCategoryChanged: false,
      isLoading: false,
      currentCategory: res.data
    }));
  }

  getAllCategory = (category, objTemp) => {
    if (!category) {
      return false;
    }

    if (category.parent) {
      this.getAllCategory(category.parent, objTemp);
    }
    objTemp.arrCategories.push(category);

    return true;
  }

  renderBreadcrumb = objTemp => objTemp.arrCategories.map(category => {
    objTemp.url += `/${category.metaTitle}`;

    if (category.id === this.state.currentCategory.id) {
      return (
        <li key={category.id} className="breadcrumb-item">
          <NavLink className="breadcrumb-link" to={`${objTemp.url}-${category.id}`}>
            {category.name}
          </NavLink>
        </li>
      )
    }
    else {
      return (
        <li key={category.id} className="breadcrumb-item">
          <NavLink className="breadcrumb-link" to={`${objTemp.url}-${category.id}`}>
            {category.name}
          </NavLink>
          <span className="breadcrumb-separator">/</span>
        </li>
      );
    }
  })

  render() {
    const { isLoading, currentCategory } = this.state;
    let objTemp = { url: "/san-pham", arrCategories: [] };

    if (isLoading) {
      return (
        <div className="container breadcrumb-wrapper first-section-gap"><Spin /></div>
      );
    }

    this.getAllCategory(currentCategory, objTemp);
    return (
      <div className="container breadcrumb-wrapper first-section-gap">
        <ul className="small-breadcrumb">
          <li className="breadcrumb-item">
            <NavLink className="breadcrumb-link" to="/">Trang chủ</NavLink>
            <span className="breadcrumb-separator">/</span>
          </li>
          {this.renderBreadcrumb(objTemp)}
        </ul>
      </div>
    );
  }
}

export default Breadcrumb;
