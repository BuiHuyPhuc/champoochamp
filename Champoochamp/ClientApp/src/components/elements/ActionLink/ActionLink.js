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
  getItem = (group, filterItem, callback) => {
    callback(group, filterItem);
  }

  render() {
    const { group, filterItem, title, iconType, callback  } = this.props;

    return (
      <StyledActionLink onClick={() => this.getItem(group, filterItem, callback)}>
        {iconType && <AwesomeIcon type={iconType}></AwesomeIcon>}
        <Title iconType={iconType}>{title}</Title>
      </StyledActionLink>
    );
  }
}

ActionLink.propsTypes = {
  group: PropTypes.string,
  filterItem: PropTypes.object,
  title: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  callback: PropTypes.func
};

export default ActionLink;
