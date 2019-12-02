import React, { Component } from 'react';
import { Modal } from 'antd';
import styled from '@emotion/styled';

import { Link, Image } from '../../../../../../../elements';
import sizeTable from '../../../../../../../../assets/size-table.jpg';

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

  hideModal = () => {
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
          title="Hướng dẫn chọn size quần áo"
          visible={visible}
          onCancel={this.hideModal}
          footer={null}
        >
          <Image imageUrl={sizeTable} alt="" />
        </Modal>
      </Wrapper>
    );
  }
}

export default SizeReference;
