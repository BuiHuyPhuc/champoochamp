import React, { Component } from "react";

import Breadcrumb from './components/Breadcrumb';
import ProductList from './components/ProductList';

class CategoryPage extends Component {
    getIdCategory = () => {
        const { lv1, lv2, lv3 } = this.props.match.params;
        if (lv3) {
            return this.getIdInMetaTitle(lv3);
        }
        else if (lv2) {
            return this.getIdInMetaTitle(lv2);
        }
        else if (lv1) {
            return this.getIdInMetaTitle(lv1);
        }

        return true;
    }

    getIdInMetaTitle = metaTitle => {
        const metaTitleArr = metaTitle.split(`-`);
        return metaTitleArr[metaTitleArr.length - 1];
    }

    render() {        
        return (
            <div>
                <Breadcrumb idCategory={this.getIdCategory()}></Breadcrumb>
                <ProductList idCategory={this.getIdCategory()}></ProductList>
            </div>
        );
    }
}

export default CategoryPage;
