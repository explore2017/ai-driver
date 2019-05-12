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
  InputNumber,
  Radio,
  Modal,
  Icon,
  Tooltip,
  Table,
  Divider,
  Popconfirm,
  Row,
  Col,
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
      user: {}
    }
  }

  componentDidMount() {
    this.initialValue();
  }

  initialValue() {
    const api = "http://localhost:8080/fetchCurrent";
    request(api).then((res) => {
      this.setState({
        user: res.entity
      })
    }).catch(() => {
      message.error('请求失败');
    })
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const api = 'http://localhost:8080/student/changeInfo';
        request(api, {
          method: 'POST',
          body: {
            ...values
          }
        }).then((res) => {
          if (res.status == 0) {
            message.success(res.msg);
            form.resetFields();
          } else {
            notification.warning({
              message: res.msg,
            })
          }
        }).catch((res) => {
          notification.error({
            message: '请求错误',
            description: '请稍后重试或联系管理员！',
          })
        })
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

    const { user } = this.state;
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
              <span>{user.campus_id}</span>
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