import React, { Component } from "react";

import listensToClickOutside from "react-onclickoutside";

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOpen: false,
      headerTitle: props.title
    };
  }

  static getDerivedStateFromProps(nextProps){
    const count = nextProps.list.filter(item=>item.selected).length;
    if(count===0){
      return {headerTitle: nextProps.title};
    }
    else{
      return {headerTitle: count};
    }
  }

  handleClickOutside = e => {
    this.setState({
      listOpen: false
    });
  };

  toggleList = () => {
    const { listOpen } = this.state;

    this.setState({
      listOpen: !listOpen
    });
  };

  render() {
    const { list, toggleItem } = this.props;
    const { listOpen, headerTitle } = this.state;

    return (
      <div className="dropdown">
        <div className="dropdown-header" onClick={this.toggleList}>
          <div className="dropdown-header-title">{headerTitle}</div>
          {listOpen ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </div>
        {listOpen && (
          <ul className="dropdown-list">
            {list.map(item => (
              <li
                className="dropdown-list-item"
                key={item.title}
                onClick={()=>toggleItem(item.id, item.key)}
              >
                {item.title}
                {item.selected && <i className="fas fa-check"></i>}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default listensToClickOutside(DropDown);
