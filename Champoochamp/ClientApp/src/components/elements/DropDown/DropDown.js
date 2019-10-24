import React, { Component } from "react";
import styled from "@emotion/styled";
import listensToClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

import getObjectById from "./getObjectById";

import COLORS from "../../../shared/color";
import AwesomeIcon from "../AwesomeIcon";

const Wrapper = styled("div")`
  position: relative;
`;

const Header = styled("div")`
  align-items: center;
  border: ${props => (props.hasBorder ? `solid 1px ${COLORS.GRAY}` : "none")};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: ${props => (props.hasBorder ? "10px" : "0")};
  width: ${props => (props.hasBorder ? "100%" : "auto")};
`;

const Title = styled("span")`
  margin-right: 10px;
`;

const OptionList = styled("ul")`
  background: ${COLORS.WHITE};
  border: solid 1px ${COLORS.GRAY};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  position: absolute;
  right: 0;
  top: 100%;
  width: 100%;
  z-index: 100;
`;

const Option = styled("li")`
  cursor: pointer;
  padding: 10px 15px;

  &:hover {
    background: ${COLORS.LIGHT_GRAY};
  }
`;

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      title: props.title,
      selectedOption: props.prevSelectedOption
    };
  }

  handleClickOutside = e => {
    this.setState({
      isOpen: false
    });
  };

  toggleOptionList = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleOption = (id, callback) => {
    const optionList = this.props.optionList;

    this.setState({
      selectedOption: getObjectById(optionList, id),
      isOpen: false
    }, () => callback(this.state.selectedOption));
  };

  render() {
    const { optionList, callback, hasBorder } = this.props;
    const { isOpen, title, selectedOption } = this.state;

    return (
      <Wrapper>
        <Header onClick={this.toggleOptionList} hasBorder={hasBorder}>
          <Title>{selectedOption? selectedOption.name : title}</Title>
          {isOpen ? (
            <AwesomeIcon type="fas fa-chevron-up"></AwesomeIcon>
          ) : (
            <AwesomeIcon type="fas fa-chevron-down"></AwesomeIcon>
          )}
        </Header>

        {isOpen && (
          <OptionList>
            {optionList.map(item => (
              <Option
                key={item.id}
                onClick={() => this.toggleOption(item.id, callback)}
              >
                {item.name}
              </Option>
            ))}
          </OptionList>
        )}
      </Wrapper>
    );
  }
}

DropDown.propTypes = {
  title: PropTypes.string.isRequired,
  optionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func,
  hasBorder: PropTypes.bool,
  prevSelectedOption: PropTypes.object
};

export default listensToClickOutside(DropDown);
