import React, { Component } from 'react';
import { Row, Col, Collapse, Spin } from 'antd';

import { filtersGroup } from '../../../../../../shared/constants';
import { callAPI, getMoneyFilterGroup, checkCurrentFilter } from '../../../../../../shared/utils';

import SingleFilter from './conponents/SingleFilter';

const { Panel } = Collapse;

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: this.props.categoryId,
      isCategoryChanged: false,
      isLoading: true,
      filterGroupList: [],
      moneyFilterGroup: getMoneyFilterGroup(),
      currentFilterList: [
        { name: filtersGroup.size, data: [] },
        { name: filtersGroup.color, data: [] },
        { name: filtersGroup.brand, data: [] }
      ],
      currentMoneyFilter: { id: 0 }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categoryId !== prevState.categoryId) {
      return {
        categoryId: nextProps.categoryId,
        isCategoryChanged: true
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { isCategoryChanged, categoryId } = this.state;

    if (isCategoryChanged) {
      this.getFilterGroupList(categoryId);
    }
  }

  componentDidMount() {
    this.getFilterGroupList(this.state.categoryId);
  }

  getFilterGroupList = categoryId => {
    const url = `Filter/GetFilterGroupListByCategoryId-${categoryId}`;

    callAPI(url).then(res => this.setState({
      isLoading: false,
      isCategoryChanged: false,
      filterGroupList: res.data,
      currentFilterList: [
        { name: filtersGroup.size, data: [] },
        { name: filtersGroup.color, data: [] },
        { name: filtersGroup.brand, data: [] }
      ],
      currentMoneyFilter: { id: 0 }
    }))
  }

  renderFilterGroupList = filterGroupList => filterGroupList.map((filterGroup, index) => {
    return (
      <Panel
        key={index}
        className="filter-item"
        header={<span className="filter-item-title">{filterGroup.name}</span>}
      >
        <Row gutter={8}>
          {
            filterGroup.name === filtersGroup.money ?
              this.renderMoneyFilterGroup(this.state.moneyFilterGroup) :
              this.renderFilterGroup(filterGroup)
          }
        </Row>
      </Panel>
    );
  })

  renderFilterGroup = filterGroup => filterGroup.data.map(item => {
    return (
      <Col span={12} key={item.id}>
        <SingleFilter
          group={filterGroup.name}
          filterItem={item}
          title={item.name}
          callback={this.ParentOnclick}
        />
      </Col>
    );
  })

  renderMoneyFilterGroup = moneyFilterGroup => moneyFilterGroup.data.map(item => {
    if (!item.fromMoney) {
      return (
        <Col span={12} key={item.id}>
          <SingleFilter
            group={moneyFilterGroup.name}
            filterItem={item}
            title={`Dưới ${item.toMoney}`}
            callback={this.ParentOnclick}
          />
        </Col>
      );
    }
    else if (!item.toMoney) {
      return (
        <Col span={12} key={item.id}>
          <SingleFilter
            group={moneyFilterGroup.name}
            filterItem={item}
            title={`Trên ${item.fromMoney}`}
            callback={this.ParentOnclick}
          />
        </Col>
      );
    }
    else {
      return (
        <Col span={12} key={item.id}>
          <SingleFilter
            group={moneyFilterGroup.name}
            filterItem={item}
            title={`${item.fromMoney} - ${item.toMoney}`}
            callback={this.ParentOnclick}
          />
        </Col>
      );
    }
  })

  renderCurrentFilterList = currentFilterList => currentFilterList.map(currentFilter => {
    return (
      currentFilter.data.map(item => {
        return (
          <SingleFilter
            key={item.id}
            group={currentFilter.name}
            filterItem={item}
            title={item.name}
            iconType="fas fa-times"
            callback={this.ParentOnclick}
          />
        );
      })
    );
  })

  renderCurrentMoneyFilter = (group, currentMoneyFilter) => {
    if (currentMoneyFilter.id === 0) {
      return true;
    }
    else if (!currentMoneyFilter.fromMoney) {
      return (
        <SingleFilter
          key={currentMoneyFilter.id}
          group={group}
          filterItem={currentMoneyFilter}
          title={`Dưới ${currentMoneyFilter.toMoney}`}
          iconType="fas fa-times"
          callback={this.ParentOnclick}
        />
      );
    }
    else if (!currentMoneyFilter.toMoney) {
      return (
        <SingleFilter
          key={currentMoneyFilter.id}
          group={group}
          filterItem={currentMoneyFilter}
          title={`Trên ${currentMoneyFilter.fromMoney}`}
          iconType="fas fa-times"
          callback={this.ParentOnclick}
        />
      );
    }
    else {
      return (
        <SingleFilter
          key={currentMoneyFilter.id}
          group={group}
          filterItem={currentMoneyFilter}
          title={`${currentMoneyFilter.fromMoney} - ${currentMoneyFilter.toMoney}`}
          iconType="fas fa-times"
          callback={this.ParentOnclick}
        />
      );
    }
  }

  clearCurrentFilterList = () => {
    const { currentFilterList } = this.state;

    currentFilterList.forEach(groupFilter => {
      groupFilter.data = []
    });

    this.setState({
      currentFilterList,
      currentMoneyFilter: { id: 0 }
    }, () => this.props.getCurrentFilterList(this.state.currentFilterList, this.state.currentMoneyFilter));
  }

  ParentOnclick = (group, filterItem) => {
    const { currentFilterList, currentMoneyFilter } = this.state;

    if (group === filtersGroup.money) {
      if (currentMoneyFilter.id === filterItem.id) {
        this.setState({ currentMoneyFilter: { id: 0 } },
          () => this.props.getCurrentFilterList(this.state.currentFilterList, this.state.currentMoneyFilter));
      }
      else {
        this.setState({ currentMoneyFilter: filterItem },
          () => this.props.getCurrentFilterList(this.state.currentFilterList, this.state.currentMoneyFilter));
      }
    }
    else {
      let isDelete = false;

      currentFilterList.forEach(groupFilter => {
        if (groupFilter.name === group) {
          groupFilter.data.forEach((item, index, object) => {
            if (item.id === filterItem.id) {
              object.splice(index, 1);
              isDelete = true;
            }
          })

          if (!isDelete) {
            groupFilter.data.push(filterItem);
          }
        }
      });

      this.setState({ currentFilterList },
        () => this.props.getCurrentFilterList(this.state.currentFilterList, this.state.currentMoneyFilter));
    }
  }

  render() {
    const { isLoading, filterGroupList, currentFilterList, currentMoneyFilter } = this.state;

    if (isLoading) {
      return (
        <div><Spin /></div>
      );
    }

    return (
      <div>
        <Collapse bordered={false} className="collapse-filter-panel">
          <Panel
            header={
              <button className="collapse-filter-btn">
                <i className="fas fa-sliders-h"></i>Bộ lọc
              </button>
            }
            showArrow={false}
          >
            <div className="filter-panel">
              <div className="filter-header">
                <h4 className="title-text">Lọc sản phẩm</h4>
                {checkCurrentFilter(currentFilterList, currentMoneyFilter) ? (
                  <button className="clear-all" onClick={this.clearCurrentFilterList}>
                    <i className="far fa-minus-square"></i>Xoá tất cả
                  </button>
                ) : null}
                <div className="selected-items-wrapper">
                  {this.renderCurrentFilterList(currentFilterList)}
                  {this.renderCurrentMoneyFilter(filtersGroup.money, currentMoneyFilter)}
                </div>
              </div>

              <Collapse
                className="filter-body"
                bordered={false}
                expandIconPosition="right"
              >
                {this.renderFilterGroupList(filterGroupList)}
              </Collapse>
            </div>
          </Panel>
        </Collapse>

        {/*for desktop*/}
        < div className="visible-filter-panel" >
          <div className="filter-panel">
            <div className="filter-header">
              <h4 className="title-text">Lọc sản phẩm</h4>
              {checkCurrentFilter(currentFilterList, currentMoneyFilter) ? (
                <button className="clear-all" onClick={this.clearCurrentFilterList}>
                  <i className="far fa-minus-square"></i>Xoá tất cả
                  </button>
              ) : null}
              <div className="selected-items-wrapper">
                {this.renderCurrentFilterList(currentFilterList)}
                {this.renderCurrentMoneyFilter(filtersGroup.money, currentMoneyFilter)}
              </div>
            </div>

            <Collapse
              className="filter-body"
              bordered={false}
              expandIconPosition="right"
            >
              {this.renderFilterGroupList(filterGroupList)}
            </Collapse>
          </div>
        </div >
      </div >
    );
  }
}

export default FilterPanel;
