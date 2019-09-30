import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import COLORS from "../../../shared/color";

const StyledButton = styled("button")`
  background: ${props => (props.isSecondary ? COLORS.WHITE : COLORS.BLACK)};
  border: solid 1px ${COLORS.BLACK};
  color: ${props => (props.isSecondary ? COLORS.BLACK : COLORS.WHITE)};
  cursor: pointer;
  letter-spacing: 0.5px;
  outline: none;
  padding: 1rem 2rem;
  margin: 0;
  transition: all 0.3s;

  &:hover {
    background: ${COLORS.LIGHT_GRAY};
    border: solid 1px ${COLORS.LIGHT_GRAY};
    color: ${COLORS.BLACK};
  }
`;

class Button extends Component {
  render() {
    const { title, isSecondary } = this.props;

    return <StyledButton isSecondary={isSecondary}>{title}</StyledButton>;
  }
}

Button.propsTypes = {
  type: PropTypes.string.isRequired
};

export default Button;
