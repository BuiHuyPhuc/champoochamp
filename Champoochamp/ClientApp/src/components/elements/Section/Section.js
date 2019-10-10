import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Wrapper = styled("div")`
  padding-top: ${props => (props.isFirstSection ? "80px" : "40px")};
  padding-bottom: 40px;
`;

class Section extends Component {
  render() {
    const { isFirstSection, children } = this.props;

    return <Wrapper isFirstSection={isFirstSection}>{children}</Wrapper>;
  }
}

Section.propsTypes = {
  children: PropTypes.element.isRequired
};

export default Section;
