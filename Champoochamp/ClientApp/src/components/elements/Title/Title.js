import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const StyledTitle = styled("span")`
  font-weight: 700;
`;

class Title extends Component {
  render() {
    const { content } = this.props;

    return <StyledTitle>{content}</StyledTitle>;
  }
}

Title.propsTypes = {
    content: PropTypes.string.isRequired
};

export default Title;
