/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

const imageStyle = css`
  margin: auto;
  max-width: 100%;
`;

class Image extends React.Component {
  render() {
    const { imageUrl, alt } = this.props;

    return <img src={imageUrl} alt={alt} css={imageStyle}></img>;
  }
}

Image.propsTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string
};

export default Image;
