import React, { Component } from 'react';
import styled from '@emotion/styled';

import { typography } from '../../../../../../shared/principles';
import { groupBy } from '../../../../../../shared/utils';

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
    const { colors, product, getImageUrls, getColorId } = props;
    this.state = {
      selectedColor: colors[0],
      sizes: groupBy(
        product.productVariant.filter(
          item => item.colorId === colors[0].colorId
        ),
        p => p.sizeId
      ).map(item => item.size)
    };

    const { selectedColor } = this.state;
    getImageUrls && getImageUrls(selectedColor);
    getColorId && getColorId(selectedColor.color.id);
  }

  getSelectedColor = selectedColor => {
    const { product, getImageUrls, getColorId } = this.props;

    this.setState({
      selectedColor,
      sizes: groupBy(
        product.productVariant.filter(
          item => item.colorId === selectedColor.colorId
        ),
        p => p.sizeId
      ).map(item => item.size)
    });

    getImageUrls && getImageUrls(selectedColor);
    getColorId && getColorId(selectedColor.color.id);
  };

  render() {
    const { sizes, selectedColor } = this.state;
    const { colors, getSize, getQuantity } = this.props;

    return (
      <Wrapper>
        <ChoiceBox>
          <BoxTitle>Màu sắc</BoxTitle>
          <ColorRow
            colors={colors}
            size={30}
            selectedColor={selectedColor}
            getSelectedColor={this.getSelectedColor}
          />
        </ChoiceBox>
        <ChoiceBox>
          <BoxTitle>Kích thước</BoxTitle>
          <DropDown
            title="Chọn kích thước"
            optionList={sizes}
            hasBorder
            callback={getSize}
            selectedColor={selectedColor}
          />
          <SizeReference />
        </ChoiceBox>
        <ChoiceBox>
          <BoxTitle>Số lượng</BoxTitle>
          <QuantityInput callback={getQuantity} width="120px" />
        </ChoiceBox>
      </Wrapper>
    );
  }
}

export default VariantChoice;
