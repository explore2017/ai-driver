import React, { Component } from 'react';
import { Card, Statistic, Row, Col, Button, Icon } from 'antd'
import { Link } from 'react-router-dom';
import request from '@/utils/request';

export default class index extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      count:{}
    }
  }
  
  componentDidMount(){
    let api = "http://localhost:8080/count";
    request(api).then(res => {
      this.setState({
        count:res.data
      })
    }).catch(() => { });
  }

  render() {

    const {count} = this.state;
    return (
      <Card style={{ minHeight: 600 }}>
        <div style={{ marginTop: 40 }}>
          <div style={{marginBottom:20}}>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic title="学员总数" value={count.student} prefix={<Icon type="user" />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="教练总数" value={count.coach} prefix={<Icon type="team" />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="校区总数" value={count.campus} prefix={<Icon type="environment" />} />
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row gutter={16}>
              <Col  span={8}>
                <Card>
                  <Statistic title="车辆总数" value={count.vehicle} prefix={<Icon type="car" />} />
                </Card>
              </Col>
              <Col  span={8}>
                <Card>
                  <Statistic title="物资总数" value={count.source} prefix={<Icon type="folder" />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="员工总数" value={count.staff} prefix={<Icon type="user-add" />} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    )
  }
}
