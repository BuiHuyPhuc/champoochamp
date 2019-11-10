import React, { Component } from 'react';
import styled from '@emotion/styled';

import { typography } from '../../../../../../shared/principles';
import { DropDown, ColorRow, QuantityInput } from '../../../../../elements';
import SizeReference from './components/SizeReference';

const Wrapper = styled('div')`
  padding: 0;
`;

const ChoiceBox = styled('div')`
  margin-bottom: 30px;
`;

const BoxTitle = styled('h4')`
  ${typography.xsTitle};
`;

class VariantChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [
        {
          id: 0,
          name: 'S'
        },
        {
          id: 1,
          name: 'M'
        },
        {
          id: 2,
          name: 'L'
        },
        {
          id: 3,
          name: 'XL'
        },
        {
          id: 4,
          name: 'XXL'
        }
      ],
      colors: [
        {
          id: 0,
          name: '#E6BDA7'
        },
        {
          id: 1,
          name: '#989CA0'
        },
        {
          id: 2,
          name: '#B0D5C1'
        }
      ]
    };
  }

  callback = () => {
    //do something here
  };

  render() {
    const { colors, sizes } = this.state;

    return (
      <Wrapper>
        <ChoiceBox>
          <BoxTitle>Màu sắc</BoxTitle>
          <ColorRow colors={colors} size={30} />
        </ChoiceBox>
        <ChoiceBox>
          <BoxTitle>Kích thước</BoxTitle>
          <DropDown
            title="Chọn kích thước"
            optionList={sizes}
            hasBorder
            callback={this.callback}
          />
          <SizeReference />
        </ChoiceBox>
        <ChoiceBox>
          <BoxTitle>Số lượng</BoxTitle>
          <QuantityInput
            callback={this.callback}
            width="120px"
          />
        </ChoiceBox>
      </Wrapper>
    );
  }
}

export default VariantChoice;
