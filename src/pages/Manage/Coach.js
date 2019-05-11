import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, message, Divider, Popconfirm, Button } from 'antd';
import { request } from '@/utils/request';
import { Link } from 'react-router-dom';

export default class Coach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    // request("api").then((res)=>{
    // 	if(res.status===0){
    // 		this.setState({
    // 			list:res.data
    // 		})
    // 	}
    // });
  }

  handleDelete() {
    console.log('del');
  }

  handleEdit() {
    console.log('edit');
  }

  render() {
    const source = [
      {
        id: 1,
        name: 'name',
        jobNum: 'jobNum',
        campusId: 'compusId',
      },
    ];

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '工号',
        dataIndex: 'jobNum',
        key: 'jobNum',
      },
      {
        title: '校区',
        dataIndex: 'campusId',
        key: 'campusId',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '操作',
        key: 'operator',
        render: record => {
          return (
            <span>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="你确认删除吗?"
                onConfirm={() => this.handleDelete(record)}
                okText="Yes"
                cancelText="No"
              >
                <a style={{ color: 'red' }}>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    return (
      <PageHeaderWrapper>
        <Card>
          <Link to="/index">
            <Button type="primary" style={{ marginBottom: 20 }}>
              新建
            </Button>
          </Link>
          <Table dataSource={source} columns={columns} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
