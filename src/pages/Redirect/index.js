import React, { Component } from 'react';
import { Card, Statistic, Row, Col, Button, Icon } from 'antd';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('antd-pro-authority') === '["student"]') {
      this.props.history.push('/learner/news');
    } else {
      this.props.history.push('/manage/student');
    }
  }

  render() {
    return <Card style={{ minHeight: 600 }} />;
  }
}
