import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Select, Button, Card, Icon, DatePicker, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({}) => ({}))
@Form.create()
class Vehicle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      campusList: [],
      coachList: [],
    };
  }

  componentDidMount() {
    let api = 'http://localhost:8080/manage/showAllCampus';
    request(api).then(res => {
      if (res.status == 0) {
        this.setState({
          campusList: res.data,
        });
      }
    }).catch(()=>{
      
    });
    request('http://localhost:8080/manage/Coaches').then(res => {
      if (res.status == 0) {
        this.setState({
          coachList: res.data,
        });
      }
    }).catch(()=>{
      
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.purchaseTime = values.purchaseTime.format('YYYY-MM-DD');
        let api = 'http://localhost:8080/vehicle/addVehicle';
        request(api, {
          method: 'POST',
          data: values,
        })
          .then(res => {
            if (res.status == '0') {
              message.success(res.msg);
              this.props.form.resetFields();
            } else {
              message.error(res.msg);
            }
          })
          .catch(() => {
            message.error('登记失败');
          });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <PageHeaderWrapper title={'车辆登记'} content={''}>
        <Card bordered={false}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label={'车牌号'}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入车牌号',
                  },
                ],
              })(<Input placeholder={'请输入车牌号'} />)}
            </FormItem>
            <FormItem label="所属教练">
              {getFieldDecorator('coachId', {
                rules: [
                  {
                    required: true,
                    message: '请选择教练',
                  },
                ],
              })(
                <Select placeholder="请选择教练">
                  {this.state.coachList.map(item => {
                    return (
                      <Option value={item.coach.id} key={item.coach.id}>
                        {item.coach.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem label="所属校区">
              {getFieldDecorator('compusId', {
                rules: [
                  {
                    required: true,
                    message: '请选择校区！',
                  },
                ],
              })(
                <Select placeholder="请选择校区">
                  {this.state.campusList.map(item => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem label="状态">
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                    message: '请选择车辆状态',
                  },
                ],
              })(
                <Select placeholder="请选择状态">
                  <Option value={0}>无法使用</Option>
                  <Option value={1}>可以使用</Option>
                  <Option value={2}>正在维修</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="购买时间">
              {getFieldDecorator('purchaseTime', {
                rules: [
                  {
                    required: true,
                    message: '请填写购买日期',
                  },
                ],
              })(<DatePicker />)}
            </FormItem>
            <FormItem {...tailFormItemLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Vehicle;
