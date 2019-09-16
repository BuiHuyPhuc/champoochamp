import React, { Component } from "react";

class SectionTitle extends Component {
  render() {
    const {sectionTitle}=this.props;

    return (
      <div className="section-title-wrapper">
        <h3 className="section-title">{sectionTitle}</h3>
      </div>
    );
  }
}

export default SectionTitle;
