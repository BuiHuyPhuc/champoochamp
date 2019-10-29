import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { breakpoint, colors } from '../../../shared/principles';

import ColorRow from '../ColorRow';
import Image from '../Image';

const Wrapper = styled('div')`
  background: ${colors.white};
  border: solid 1px transparent;
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
  font-weight: 700;
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

  getImageUrl = (imageName, imageGroup) =>
    require(`../../../assets/images/${imageGroup}/${imageName}`);

  render() {
    const { imageGroup, product } = this.props;
    const { colors } = this.state;

    return (
      <Wrapper>
        <NavLink to={`/chi-tiet/${product.metaTitle}-${product.id}`}>
          <Image
            imageUrl={this.getImageUrl(
              product.productVariant[0].thumbnail,
              imageGroup
            )}
            alt=""
          ></Image>
        </NavLink>
        <ColorsWrapper>
          <ColorRow size={20} colors={colors}></ColorRow>
        </ColorsWrapper>
        <Name>{product.name}</Name>
        <Price>{product.promotionPrice.toLocaleString()}đ</Price>
        {product.isDiscount && (
          <OriginalPrice>{product.price.toLocaleString()}đ</OriginalPrice>
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
