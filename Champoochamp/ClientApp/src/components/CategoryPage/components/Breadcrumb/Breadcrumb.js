import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Spin } from "antd";
import { API_PORT } from "../../../../shared/constants";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: this.props.categoryId,
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
    axios.get(`${API_PORT}/api/Category/GetCategoryById-${categoryId}`)
      .then(response => response.data)
      .then(data => this.setState({
        isCategoryChanged: false,
        isLoading: false,
        currentCategory: data
      }))
      .catch(error => console.log(`ERROR_Breadcrumb_GetCategoryById: ` + error));
  }

  getAllCategory = (category, objTemp) => {
    if (category.parent) {
      this.getAllCategory(category.parent, objTemp);
    }

    if (category.id !== this.state.currentCategory.id) {
      objTemp.arrCategories.push(category);
    }

    return true;
  }

  getBreadcrumb = objTemp => objTemp.arrCategories.map(category => {
    objTemp.url += `/${category.metaTitle}`;

    return (
      <li key={category.id} className="breadcrumb-item">
        <NavLink className="breadcrumb-link" to={`${objTemp.url}-${category.id}`}>
          {category.name}
        </NavLink>
        <span className="breadcrumb-separator">/</span>
      </li>
    );
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
          {this.getBreadcrumb(objTemp)}
        </ul>
        <h3 className="current-page">{currentCategory.name}</h3>
      </div>
    );
  }
}

export default Breadcrumb;
