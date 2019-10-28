import React, { Component } from 'react';
import styled from '@emotion/styled';

import { typography } from '../../../../../../shared/principles';
import { groupBy } from "../../../../../../shared/utils";

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
      sizes: groupBy(props.product.productVariant, p => p.sizeId).map(item => item.size),
      colors: groupBy(props.product.productVariant, p => p.colorId)
    };
  }

  render() {
    const { colors, sizes } = this.state;
    const { getImageUrls, getColorId, getSize } = this.props;

    return (
      <Wrapper>
        <ChoiceBox>
          <BoxTitle>Màu sắc</BoxTitle>
          <ColorRow colors={colors} size={30} getImageUrls={getImageUrls} getColorId={getColorId} />
        </ChoiceBox>
        <ChoiceBox>
          <BoxTitle>Size</BoxTitle>
          <DropDown
            title="Chọn size"
            optionList={sizes}
            hasBorder
            callback={getSize}
          />
        </ChoiceBox>
      </Wrapper>
    );
  }
}

export default VariantChoice;
