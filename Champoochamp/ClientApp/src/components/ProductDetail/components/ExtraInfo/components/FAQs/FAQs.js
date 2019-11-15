import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Collapse, Icon } from 'antd';

import { colors } from '../../../../../../shared/principles';

const { Panel } = Collapse;

const Wrapper = styled('div')`
  padding: 10px 0;

  .ant-collapse {
    background: ${colors.white};
    border-radius: 0;

    .ant-collapse-item:last-child {
      border-radius: 0;
    }
  }
`;

const header1 = 'Mua hàng bằng cách nào?';
const header2 = 'Cửa hàng của shop ở đâu?';
const header3 = 'Thời gian mở cửa và làm việc của Shop như thế nào?';

class FAQs extends Component {
  render() {
    return (
      <Wrapper>
        <Collapse
          expandIconPosition="right"
          expandIcon={({ isActive }) =>
            isActive ? <Icon type="minus" /> : <Icon type="plus" />
          }
        >
          <Panel header="Mua hàng bằng cách nào?">
            <p>{header1}</p>
          </Panel>
          <Panel header="Cửa hàng của shop ở đâu?">
            <p>{header2}</p>
          </Panel>
          <Panel header="Thời gian mở cửa và làm việc của Shop như thế nào?">
            <p>{header3}</p>
          </Panel>
        </Collapse>
      </Wrapper>
    );
  }
}

export default FAQs;
