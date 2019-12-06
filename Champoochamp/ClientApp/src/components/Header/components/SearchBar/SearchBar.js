import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import listensToClickOutside from 'react-onclickoutside';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { colors, breakpoint } from '../../../../shared/principles';

import { searchGroup } from '../../../../shared/constants';

const Wrapper = styled('div')`
  align-items: center;
  background: ${colors.offWhite};
  border-radius: 5px;
  display: flex;
  padding: 5px;
  position: relative;

  ${breakpoint.lg`
    display: none;
  `}
`;

const SearchInput = styled('input')`
  background: none;
  border: none;
  color: ${colors.black};
  outline: none;
  width: 250px;

  ${breakpoint.xl`
    width: 200px;
  `}
`;

const SearchIcon = styled(Icon)`
  color: ${colors.darkGray};
  margin: 0 5px;
`;

const SuggestionList = styled('ul')`
  background: ${colors.white};
  border: solid 1px ${colors.gray};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
  list-style: none;
  max-height: 80vh;
  overflow-y: auto;
  padding: 0;
  position: absolute;
  right: 0;
  top: 120%;
  width: 100%;
  z-index: 100;
`;

const SuggestionGroup = styled('li')`
  color: ${colors.darkGray};
  padding: 10px;
`;

const SuggestionItem = styled('li')`
  display: flex;
`;

const ItemLink = styled(NavLink)`
  color: ${colors.black};
  padding: 10px 20px;
  width: 100%;

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.black};
  }
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    };
  }

  handleClickOutside = () => {
    this.onHideSuggestions();
  };

  onHideSuggestions = () => {
    this.setState({
      showSuggestions: false
    });
  };

  onKeyDownInput = e => {
    const { userInput } = this.state;
    const { location, push } = this.props.history;

    if (e.keyCode === 13 && userInput) {
      if (
        location.pathname.slice(10).toLowerCase() !== userInput.toLowerCase()
      ) {
        push(`/tim-kiem/${userInput}`);
      }

      this.setState({
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ''
      });
    }
  };

  onChangeInput = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.data.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClearInput = () => {
    this.setState({
      userInput: ''
    });
  };

  renderSuggestionList = filteredSuggestions => {
    return (
      <SuggestionList>
        <SuggestionGroup>{searchGroup.category}</SuggestionGroup>
        {filteredSuggestions.map(
          suggestion =>
            suggestion.group === searchGroup.category && (
              <SuggestionItem key={suggestion.data.id}>
                <ItemLink
                  to={`/san-pham/${suggestion.data.metaTitle}-${suggestion.data.id}`}
                  onClick={this.onHideSuggestions}
                >
                  {suggestion.data.name}
                </ItemLink>
              </SuggestionItem>
            )
        )}

        <SuggestionGroup>{searchGroup.product}</SuggestionGroup>
        {filteredSuggestions.map(
          suggestion =>
            suggestion.group === searchGroup.product && (
              <SuggestionItem key={suggestion.data.id}>
                <ItemLink
                  to={`/chi-tiet/${suggestion.data.metaTitle}-${suggestion.data.id}`}
                  onClick={this.onHideSuggestions}
                >
                  {suggestion.data.name}
                </ItemLink>
              </SuggestionItem>
            )
        )}
      </SuggestionList>
    );
  };

  render() {
    const { filteredSuggestions, showSuggestions, userInput } = this.state;

    return (
      <Wrapper>
        <NavLink to={`/tim-kiem/${userInput}`} onClick={this.onHideSuggestions} disabled={!userInput}>
          <SearchIcon type="search" title="Tìm kiếm" />
        </NavLink>
        <SearchInput
          type="text"
          placeholder="Tìm kiếm..."
          onKeyDown={this.onKeyDownInput}
          onChange={this.onChangeInput}
          value={userInput}
        />
        <SearchIcon type="close" title="Xoá" onClick={this.onClearInput} />
        {showSuggestions &&
          userInput &&
          filteredSuggestions.length > 0 &&
          this.renderSuggestionList(filteredSuggestions)}
      </Wrapper>
    );
  }
}

SearchBar.propsTypes = {
  history: PropTypes.object,
  suggestions: PropTypes.instanceOf(Array)
};

export default listensToClickOutside(SearchBar);
