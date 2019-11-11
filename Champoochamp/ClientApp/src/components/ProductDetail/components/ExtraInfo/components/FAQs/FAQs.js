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

const text = 'A dog is a type of domesticated animal.';

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
          <Panel header="This is panel header 1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Wrapper>
    );
  }
}

export default FAQs;
