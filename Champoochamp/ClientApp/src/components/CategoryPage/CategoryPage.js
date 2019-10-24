import React, { Component } from "react";

import Breadcrumb from './components/Breadcrumb';
import ProductList from './components/ProductList';
import getIdInMetaTitle from '../../shared/utils/getIdInMetaTitle';

class CategoryPage extends Component {
  getCategoryId = () => {
    const { lv1, lv2, lv3 } = this.props.match.params;
    if (lv3) {
      return getIdInMetaTitle(lv3);
    }
    else if (lv2) {
      return getIdInMetaTitle(lv2);
    }
    else if (lv1) {
      return getIdInMetaTitle(lv1);
    }

    return true;
  }

  render() {
    return (
      <div>
        <Breadcrumb categoryId={this.getCategoryId()}></Breadcrumb>
        <ProductList categoryId={this.getCategoryId()}></ProductList>
      </div>
    );
  }
}

export default CategoryPage;
