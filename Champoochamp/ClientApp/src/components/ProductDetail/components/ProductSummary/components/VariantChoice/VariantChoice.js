import React, { Component } from 'react';
import styled from '@emotion/styled';

import { typography } from '../../../../../../shared/principles';
import { DropDown, ColorRow } from '../../../../../elements';

const Wrapper = styled('div')`
  padding: 30px 0;
`;

const ChoiceBox = styled('div')`
  margin-bottom: 30px;
`;

const BoxTitle = styled('h4')`
  ${typography.xsTitle};
  margin-bottom: 10px;
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
          <BoxTitle>Size</BoxTitle>
          <DropDown
            title="Chọn size"
            optionList={sizes}
            hasBorder
            callback={this.callback}
          />
        </ChoiceBox>
      </Wrapper>
    );
  }
}

export default VariantChoice;
