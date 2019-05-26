import React, { Component } from 'react';
import { Card, Row, Col, Button, Icon, Divider, List, Avatar, Skeleton, Table, Select, Modal, message } from 'antd'
import request from '@/utils/request';

export default class index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      list: [],
      visible: false,
      detail: {},
    }
  }

  componentDidMount() {
    request("http://localhost:8080/news/searchAllNews").then((res) => {
      if (res.status == 0) {
        this.setState({
          list: res.data
        })
      }
    }).catch(() => { });
  }

  handleView(record) {
    this.setState({
      detail: record,
      visible: true
    })
  }

  handleModalVisible() {
    this.setState({
      visible: false,
    });
  }

  render() {

    const columns = [
      {
        title: '标题',
        dataIndex: 'news.title',
        key: 'title',
        render: (text, record, index) => {
          return (
            <a onClick={() => this.handleView(record.news)}>{text}</a>
          )
        }
      },
      {
        title: '类型',
        dataIndex: 'newsType.type',
        key: 'type',
      },
      {
        title: '简介',
        dataIndex: 'news.info',
        key: 'info',
      },
      {
        title: '发布时间',
        dataIndex: 'news.createTime',
        key: 'createTime',
      },
    ];

    return (
      <Card style={{ minHeight: 600 }}>
        <Divider orientation="left">驾校新闻</Divider>
        <Table dataSource={this.state.list} columns={columns} />
        <Modal
          title={'新闻详情'}
          visible={this.state.visible}
          onCancel={() => this.handleModalVisible()}
          footer={null}
        >
          <h1>{this.state.detail.title}</h1>
          <p>{this.state.detail.info}</p>
          <p>{this.state.detail.content}</p>
        </Modal>
      </Card>
    )
  }
}
