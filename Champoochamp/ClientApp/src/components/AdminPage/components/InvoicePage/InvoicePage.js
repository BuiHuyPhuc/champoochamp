import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';

import { callAPI } from '../../../../shared/utils';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 1,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'C Black',
    age: 2,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'A Green',
    age: 3,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'B Red',
    age: 4,
    address: 'London No. 2 Lake Park',
  },
];

class InvoicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceList: {},
      searchText: '',
      searchedColumn: '',
      sortedInfo: null,
      data: [],
      pagination: {},
      loading: false,
    };
  }

  componentDidMount() {
  }

  getAllInvoice = () => {
    callAPI('Checkout/GetAllInvoice').then(res => this.setState({ invoiceList: res.data }));    
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter
    });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => text
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    let { sortedInfo, invoiceList } = this.state;
    sortedInfo = sortedInfo || {};

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
        ...this.getColumnSearchProps('age'),
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        ...this.getColumnSearchProps('address'),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={invoiceList} onChange={this.handleChange} />
      </div>
    );
  }
}

export default InvoicePage;
