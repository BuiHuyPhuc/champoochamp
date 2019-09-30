import React, { Component } from "react";
import { css } from "@emotion/core";
import PropTypes from "prop-types";

const imageStyle = css`
  max-width: 100%;
`;

class Image extends Component {
  render() {
    const { imageUrl, alt } = this.props;

    return <img src={imageUrl} alt={alt} className={imageStyle}></img>;
  }
}

Image.propsTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string
};

export default Image;
