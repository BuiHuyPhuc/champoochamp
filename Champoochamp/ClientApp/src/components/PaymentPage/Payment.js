import React, { Component } from "react";
import { Spin } from 'antd';

import { callAPI, getStrShoppingCart } from '../../shared/utils';
import { storageShoppingCartKey } from '../../shared/constants';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shoppingCartList: []
    };
  }

  componentDidMount() {
    this.getShoppingCart(this.props.user);
  }

  getShoppingCart = (user) => {
    const url = `Cart/GetShoppingCart-${user ? user.Email : null}||${localStorage.getItem(storageShoppingCartKey)}`
    callAPI(url).then(res =>
      this.setState({
        isLoading: false,
        shoppingCartList: res.data
      })
    );
  }

  onPayment = (shoppingCartList, user) => {
    const url = `Payment/SaveInVoice`;
    const data = user;
    const headers = {
      'Content-Type': 'application/json'
    }
    debugger
    callAPI(url, '', 'POST', data, headers).then(res =>
      alert("fail")
    );
  }

  render() {
    const { isLoading, shoppingCartList } = this.state;
    const { user } = this.props;

    return isLoading ? (
      <Spin />
    ) : (
      <div>
        <br /> 
        <br /> 
        <br /> 
        <br /> 
        <div>Email: {user ? user.Email : null}</div>
        <div>Họ: {user ? user.FirstName : null}</div>
        <div>Tên: {user ? user.LastName : null}</div>
        <div>Số điện thoại: {user ? user.Telephone : null}</div>
        <div>Ngày tạo: {user ? user.CreatedDate : null}</div>
        <button onClick={() => this.onPayment(shoppingCartList, user)}>Thanh toán</button>   
      </div>
    );
  }
}

export default Payment;