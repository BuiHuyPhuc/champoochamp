import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { colors } from "../../../shared/principles";

const Wrapper = styled("button")`
  background: ${props => (props.isSecondary ? colors.white : colors.black)};
  border: solid 1px ${colors.black};
  color: ${props => (props.isSecondary ? colors.black : colors.white)};
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.8px;
  outline: none;
  padding: 0.9rem 1.5rem;
  margin: 0;
  transition: all 0.3s;
  width: ${props => (props.isBlockButton ? "100%" : "auto")};

  &:hover {
    background: ${colors.lightGray};
    border: solid 1px ${colors.lightGray};
    color: ${colors.black};
  }
`;

class Button extends Component {
  render() {
    const { title, isSecondary, onClick, isBlockButton } = this.props;

    return (
      <Wrapper
        isSecondary={isSecondary}
        onClick={onClick}
        isBlockButton={isBlockButton}
      >
        {title}
      </Wrapper>
    );
  }
}

Button.propsTypes = {
  title: PropTypes.string.isRequired,
  isSecondary: PropTypes.bool,
  onClick: PropTypes.func,
  isBlockButton: PropTypes.bool
};

export default Button;
