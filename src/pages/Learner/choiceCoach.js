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
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';
const FormItem = Form.Item;

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

  handleSelect = record =>{
    // record.id 
    console.log(record.coach.id)
    // const api = "http://localhost:8080/coach";
    // request(api).then((res) => {
    //   this.setState({
    //     coachList: res.data
    //   })
    // }).catch(() => {
    //   message.error('请求失败');
    // })
  }

  handleSelect = record =>{
    // record.id
    request('api').then((res)=>{
      message.info(res.msg);
    }).catch(()=>{})
  }

  render() {

    return (
      <PageHeaderWrapper>
        <Card>
        <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={this.state.coachList}
        renderItem={item => (
          <List.Item actions={[<a onClick={()=>this.handleSelect(item)}>select</a>]}>
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="#">{item.coach.name}</a>}
                description={'工号:'+ item.coach.jobNum +' 电话:'+ item.coach.phone}
              />
            </Skeleton>
          </List.Item>
        )}
      />
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default ChoiceCoach;
