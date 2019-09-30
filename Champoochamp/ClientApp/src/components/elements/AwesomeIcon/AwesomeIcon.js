import React, { Component } from "react";
import PropTypes from "prop-types";

class AwesomeIcon extends Component {
  render() {
    const type = this.props.type;

    return <i className={type}></i>;
  }
}

AwesomeIcon.propsTypes = {
  type: PropTypes.string.isRequired
};

export default AwesomeIcon;
