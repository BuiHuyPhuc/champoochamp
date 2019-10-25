import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "../../../../css/main.css";
import { searchGroup } from "../../../../shared/constants";

class AutoSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onHideSuggestions = e => {
    this.setState({
      showSuggestions: false,
    });
  }

  onKeyDownInput = e => {
    if (e.keyCode === 13) {
      const { userInput } = this.state;
      const { location, push } = this.props.history;

      if (location.pathname.slice(10).toLowerCase() !== userInput.toLowerCase()) {
        push(`/tim-kiem/${userInput}`);
      }

      this.setState({
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
      });
    }    
  }

  onChangeInput = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.data.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  }

  render() {
    const { onChangeInput, onKeyDownInput, onHideSuggestions } = this;
    const { filteredSuggestions, showSuggestions, userInput } = this.state;

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            <li>
              {searchGroup.category}
            </li>
            {filteredSuggestions.map(suggestion => {
                if (suggestion.group === searchGroup.category) {
                  return (
                    <li key={suggestion.data.id} >
                      <NavLink to={`/san-pham/${suggestion.data.metaTitle}-${suggestion.data.id}`} onClick={onHideSuggestions}>
                        {suggestion.data.name}
                      </NavLink>
                    </li>
                  );
              }

              return true;
            })}

            <li>
              {searchGroup.product}
            </li>
            {filteredSuggestions.map(suggestion => {
              if (suggestion.group === searchGroup.product) {
                return (
                  <li key={suggestion.data.id} >
                    <NavLink to={`/chi-tiet/${suggestion.data.metaTitle}-${suggestion.data.id}`} onClick={onHideSuggestions}>
                      {suggestion.data.name}
                    </NavLink>
                  </li>
                );
              }

              return true;
            })}
          </ul>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onKeyDown={onKeyDownInput}
          onChange={onChangeInput}
          value={userInput}
        />
        {suggestionsListComponent}
        <NavLink to={`/tim-kiem/${userInput}`} onClick={onHideSuggestions}>Tìm kiếm</NavLink>
      </Fragment>
    );
  }

  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
    history: PropTypes.object
  };
}

export default AutoSearch;