import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Spin } from "antd";
import { API_PORT } from "../../../../shared/constants";

class Breadcrumb extends Component {
    state = {
        isLoading: false,
        idCategory: 0,
        category: null
    };

    componentDidMount() {
        this.getCategory(this.props.idCategory);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.idCategory !== this.props.idCategory) {
            this.getCategory(nextProps.idCategory);
        }
    }

    getCategory = (idCategory) => {
        axios.get(`${API_PORT}/api/Category/GetCategoryById-${idCategory}`)
            .then(response => response.data)
            .then(data => this.setState({
                isLoading: true,
                idCategory,
                category: data
            }))
            .catch(error => console.log(`ERROR_Breadcrumb_GetCategoryById: ` + error));
    }

    getAllCategory = (category, objTemp) => {
        if (category.parent) {
            this.getAllCategory(category.parent, objTemp);
        }
        if (category.id !== this.state.category.id) {
            objTemp.arrCategories.push(category);
        }

        return true;
    }

    breadcrumb = objTemp => objTemp.arrCategories.map(category => {
        objTemp.url += `/${category.metaTitle}`;
        return (
            <li key={category.id} className="breadcrumb-item">
                <NavLink className="breadcrumb-link" to={`${objTemp.url}-${category.id}`}>{category.name}</NavLink>
                <span className="breadcrumb-separator">/</span>
            </li>
        );
    })

    render() {
        let objTemp = { url: "/san-pham", arrCategories: [] };
        const { isLoading, category } = this.state;

        if (isLoading) {
            this.getAllCategory(category, objTemp);
            return (
                <div className="container breadcrumb-wrapper first-section-gap">
                    <ul className="small-breadcrumb">
                        <li className="breadcrumb-item">
                            <NavLink className="breadcrumb-link" to="/">Trang chủ</NavLink>
                            <span className="breadcrumb-separator">/</span>
                        </li>
                        {this.breadcrumb(objTemp)}
                    </ul>
                    <h3 className="current-page">{category.name}</h3>
                </div>
            );
        }

        return (
            <div className="container breadcrumb-wrapper first-section-gap"><Spin /></div>
        );
    }
}

export default Breadcrumb;
