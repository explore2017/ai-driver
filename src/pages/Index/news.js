import React, { Component } from 'react';
import { Card, Statistic, Row, Col, Button, Icon, Divider } from 'antd'

export default class index extends Component {
  render() {
    return (
      <Card style={{ minHeight: 600 }}>
        <Divider orientation="left">驾校新闻</Divider>
        <h3 style={{textAlign:'center'}}>欢迎使用速达驾校信息管理系统</h3>
        {/* <div style={{ marginTop: 40 }}>
          <div style={{marginBottom:20}}>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic title="Student Count" value={1128} prefix={<Icon type="user" />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Coach Count" value={66} prefix={<Icon type="team" />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row gutter={16}>
              <Col  span={8}>
                <Card>
                  <Statistic title="Car Count" value={23  } prefix={<Icon type="car" />} />
                </Card>
              </Col>
              <Col  span={8}>
                <Card>
                  <Statistic title="Source Count" value={222} prefix={<Icon type="team" />} />
                </Card>
              </Col>
            </Row>
          </div>
        </div> */}
      </Card>
    )
  }
}
