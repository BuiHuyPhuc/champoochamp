import React, { Component } from 'react';
import styled from '@emotion/styled';

import { Image } from '../../../elements';
import exampleImg1 from '../../../../assets/images/products/000105_1.jpg';
import exampleImg2 from '../../../../assets/images/products/000207_1.jpg';

const Wrapper = styled('div')`
  max-width: 100vh;
`;

const BigThumbnailWrapper = styled('div')`
  text-align: center;
`;

const SmallThumbnailsWrapper = styled('ul')`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const SmallThumbnail = styled('li')`
  cursor: pointer;
  margin: 0 5px;
  width: 80px;
`;

class ImageThumbnails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageUrl: exampleImg1
    };
  }

  onClickThumbnail = imageUrl => {
    this.setState({
      currentImageUrl: imageUrl
    });
  };

  render() {
    const { currentImageUrl } = this.state;

    return (
      <Wrapper>
        <BigThumbnailWrapper>
          <Image imageUrl={currentImageUrl} alt="" />
        </BigThumbnailWrapper>

        <SmallThumbnailsWrapper>
          <SmallThumbnail onClick={() => this.onClickThumbnail(exampleImg1)}>
            <Image imageUrl={exampleImg1} alt="" />
          </SmallThumbnail>
          <SmallThumbnail onClick={() => this.onClickThumbnail(exampleImg2)}>
            <Image imageUrl={exampleImg2} alt="" />
          </SmallThumbnail>
        </SmallThumbnailsWrapper>
      </Wrapper>
    );
  }
}

export default ImageThumbnails;
