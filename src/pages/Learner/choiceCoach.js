import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import moment from 'moment';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Modal,
  Icon,
  message,
  notification,
  List,
  Avatar,
  Skeleton,
  Popconfirm
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;
const { Meta } = Card;

@Form.create()
class ChoiceCoach extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      coachList: []
    }
  }

  componentDidMount() {
    this.initialValue();
  }

  initialValue() {
    const api = "http://localhost:8080/manage/Coaches";
    request(api).then((res) => {
      this.setState({
        coachList: res.data
      })
    }).catch(() => {
      message.error('请求失败');
    })
  }


  handleSelect = record => {
    const api = "http://localhost:8080/student/selectCoach";
    request(api, {
      method: 'PUT',
      data: record
    }).then((res) => {
      message.info(res.msg);
      this.initialValue();
    }).catch(() => {
      message.error('请求失败');
    })
  }


  render() {

    return (
      <PageHeaderWrapper>
        <Card>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={this.state.coachList}
            renderItem={item => (
              <List.Item>
                <Card
                  actions={[<Popconfirm
                    title="确认选择该教练吗?"
                    onConfirm={() => this.handleSelect(item)}
                    okText="是的"
                    cancelText="我再想想"
                  ><Icon type="select" />
                  </Popconfirm>]}>
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={item.coach.name}
                    description={
                      <div>
                        <p>工号:{item.coach.jobNum}</p>
                        <p>电话:{item.coach.phone}</p>
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default ChoiceCoach;
