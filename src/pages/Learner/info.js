import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import moment from 'moment';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Icon,
  message,
  notification
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';
const FormItem = Form.Item;

@Form.create()
class Info extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        sex: '',
        phone:''
      },
      coach:{name:''},
      campus:{name:''}
    }
  }

  componentWillMount() {
    this.initialValue();
  }

  initialValue() {
    const api = "http://localhost:8080/fetchCurrent";
    request(api).then((res) => {
      this.setState({
        user: res.entity,
        coach:res.entityMore.coach,
        campus:res.entityMore.campus
      })
    }).catch(() => { })
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const api = 'http://localhost:8080/student/info';
        request(api, {
          method: 'PUT',
          data: {
            ...values
          }
        }).then((res) => {
          if (res.status == 0) {
            message.success(res.msg);
            this.initialValue();
          } else {
            notification.warning({
              message: res.msg,
            })
          }
        }).catch(() => { })
      }
    });
  };

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const { user,campus,coach } = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          <Form
            onSubmit={this.handleSubmit}
            style={{ marginTop: 20, marginBottom: 150 }}>
            <FormItem
              {...formItemLayout}
              label={'姓名'}
            >
              <span>{user.name}</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={'性别'}
            >
              <span>{user.sex}</span>
            </FormItem>
            <FormItem {...formItemLayout} label={'身份证'}>
              <span>{user.idcard}</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={'驾校校区'}
            >
              <span>{campus.name}</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={'我的教练'}
            >
              <span>{coach.name}</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={'电话'}
            >
              {getFieldDecorator('phone', {
                initialValue: user.phone,
                rules: [
                  {
                    required: true,
                    message: '请输入电话',
                  },
                ],
              })(<Input placeholder={'请输入电话'} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" >
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default Info;