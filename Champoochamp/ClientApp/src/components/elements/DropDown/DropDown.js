import React, { Component } from "react";
import styled from "@emotion/styled";
import listensToClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

import COLORS from "../../../shared/color";
import AwesomeIcon from "../AwesomeIcon";

const Wrapper = styled("div")`
  position: relative;
`;

const Header = styled("div")`
  align-items: center;
  border: solid 1px ${COLORS.BLACK};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  position: relative;
`;

const Title = styled("span")`
  margin-right: 10px;
`;

const OptionList = styled("ul")`
  background: ${COLORS.WHITE};
  border: solid 1px ${COLORS.BLACK};
  left: 0;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 100;
`;

const Option = styled("li")`
  cursor: pointer;
  padding: 10px;

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
      selectedOption: null
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
      selectedOption: optionList[id],
      isOpen: false
    });

    callback(this.state.selectedOption);
  };

  render() {
    const { optionList, callback } = this.props;
    const { isOpen, title, selectedOption } = this.state;

    return (
      <Wrapper>
        <Header onClick={this.toggleOptionList}>
          {selectedOption ? (
            <Title>{`${title}: ${selectedOption.name}`}</Title>
          ) : (
            <Title>{title}</Title>
          )}

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
                key={item.name}
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
  callback: PropTypes.func.isRequired
};

export default listensToClickOutside(DropDown);
