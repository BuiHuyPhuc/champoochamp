import React, { Component } from 'react';
import { Modal } from 'antd';
import styled from '@emotion/styled';

import { Link } from '../../../../../../../elements';

const Wrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  max-width: 80vw;
`;

class SizeReference extends Component {
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
        <Link content="Hướng dẫn chọn size" onClick={this.showModal} />
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

export default SizeReference;
