import React, { Component, Fragment } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

class Dialog extends Component {
  renderDialog = (type, title) => {
    if (type === 'error') {
      Modal.error({ title });
    }
    else if (type === 'info') {
      Modal.info({ title });
    }
  }

  render() {
    const { type, title } = this.props;

    return (
      <Fragment>
        {this.renderDialog(type, title)}
      </Fragment>
    );
  }
}

Dialog.propsTypes = {
  type: PropTypes.oneOf(['info', 'error']).isRequired,
  title: PropTypes.string.isRequired
};

export default Dialog;
