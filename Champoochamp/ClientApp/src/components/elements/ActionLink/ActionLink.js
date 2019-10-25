import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { colors } from "../../../shared/principles";
import AwesomeIcon from "../AwesomeIcon";

const Wrapper = styled("button")`
  align-items: center;
  background: none;
  border: none;
  color: ${colors.black};
  cursor: pointer;
  display: flex;
  letter-spacing: 0.5px;
  outline: none;
  padding: 0;
  margin: 0;
`;

const Title = styled("span")`
  text-decoration: ${props => (props.isUnderline
    ? "underline" : "none")};
  margin-left: ${props => (props.iconType ? "10px" : "0")};

  &:hover {
    text-decoration: underline;
  }
`;

class ActionLink extends Component {
  getItem = (group, filterItem, callback) => {
    callback(group, filterItem);
  }

  render() {
    const { group, filterItem, title, iconType, isUnderline, callback } = this.props;

    return (
      <Wrapper onClick={() => this.getItem(group, filterItem, callback)}>
        {iconType && <AwesomeIcon type={iconType}></AwesomeIcon>}
        <Title iconType={iconType} isUnderline={isUnderline}>
          {title}
        </Title>
      </Wrapper>
    );
  }
}

ActionLink.propsTypes = {
  group: PropTypes.string,
  filterItem: PropTypes.object,
  title: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  callback: PropTypes.func,
  isUnderline: PropTypes.bool,
};

export default ActionLink;
