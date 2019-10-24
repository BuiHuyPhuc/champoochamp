import React, { Component } from "react";
import { Modal } from "antd";
import styled from "@emotion/styled";

import Button from "../../../elements/Button";

const Wrapper = styled("div")`
  max-width: 100vh;
`;

class ModalSizeSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;

    return (
      <Wrapper>
        <Button title="Hướng dẫn chọn size" onClick={this.showModal} isUnderline />
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Wrapper>
    );
  }
}

export default ModalSizeSupport;