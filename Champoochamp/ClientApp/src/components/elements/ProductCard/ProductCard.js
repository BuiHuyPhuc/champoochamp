import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { breakpoint, colors, typography } from '../../../shared/principles';
import { getImageUrl, groupBy, formatMoney } from '../../../shared/utils';

import ColorRow from '../ColorRow';
import Image from '../Image';

const Wrapper = styled('div')`
  background: ${colors.white};
  border: solid 1px transparent;
  margin-bottom: 20px;
  padding: 10px;

  &:hover {
    border: solid 1px ${colors.gray};
  }

  ${breakpoint.sm`
    padding: 5px;
  `};
`;

const ColorsWrapper = styled('div')`
  margin: 10px -2px 5px -2px;
`;

const Name = styled('div')`
  ${typography.boldText};
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled('span')`
  color: ${colors.black}; 
  display: inline-block;
  margin-right: 10px;
`;

const OriginalPrice = styled('span')`
  color: ${colors.darkGray};
  display: inline-block;
  text-decoration: line-through;
`;

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: groupBy(props.product.productVariant, p => p.colorId),
      selectedColor: groupBy(props.product.productVariant, p => p.colorId)[0],
      thumbnail: props.product.productVariant[0].thumbnail
    };
  }

  getSelectedColor = selectedColor => {
    this.setState({
      selectedColor,
      thumbnail: selectedColor.thumbnail
    });
  };

  render() {
    const { imageGroup, product } = this.props;
    const { colors, selectedColor, thumbnail } = this.state;

    return (
      <Wrapper>
        <NavLink to={`/chi-tiet/${product.metaTitle}-${product.id}`}>
          <Image imageUrl={getImageUrl(thumbnail, imageGroup)} alt=""></Image>
        </NavLink>
        <ColorsWrapper>
          <ColorRow
            colors={colors}
            size={20}
            selectedColor={selectedColor}
            getSelectedColor={this.getSelectedColor}
          />
        </ColorsWrapper>
        <Name>{product.name}</Name>
        <Price>{formatMoney(product.promotionPrice, true)}đ</Price>
        {product.discountAmount > 0 && (
          <OriginalPrice>{formatMoney(product.price, true)}đ</OriginalPrice>
        )}
      </Wrapper>
    );
  }
}

ProductCard.propTypes = {
  imageGroup: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired
};

export default ProductCard;
