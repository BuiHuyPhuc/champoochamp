import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import COLORS from "../../../shared/color";
import AwesomeIcon from "../AwesomeIcon";

const StyledActionLink = styled("button")`
  align-items: center;
  background: none;
  color: ${COLORS.BLACK};
  cursor: pointer;
  display: flex;
  letter-spacing: 0.5px;
  outline: none;
  padding: 0;
  margin: 0;
`;

const Title = styled("span")`
  border-bottom: solid 1px transparent;
  margin-left: ${props => (props.iconType ? "10px" : "0")};

  &:hover {
    border-bottom: solid 1px ${COLORS.BLACK};
  }
`;

class ActionLink extends Component {
  render() {
    const { title, iconType } = this.props;

    return (
      <StyledActionLink>
        {iconType && <AwesomeIcon type={iconType}></AwesomeIcon>}
        <Title iconType={iconType}>{title}</Title>
      </StyledActionLink>
    );
  }
}

ActionLink.propsTypes = {
  type: PropTypes.string.isRequired,
  iconType: PropTypes.string
};

export default ActionLink;
