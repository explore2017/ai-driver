import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({}) => ({}))
@Form.create()
class Student extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      campusList: [],
      coachList: [],
      quartersList:[]
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
    request('http://localhost:8080/quarters/threeQuarters').then(res => {
      if (res.status == 0) {
        this.setState({
          quartersList: res.data,
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
        let api = 'http://localhost:8080/manage/insertStudent';
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
      <PageHeaderWrapper title={'学员登记'} content={''}>
        <Card bordered={false}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem label={'姓名'}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入姓名'} />)}
            </FormItem>
            <FormItem label={'性别'}>
              {getFieldDecorator('sex', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Select placeholder="请选择性别">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={'身份证号'}>
              {getFieldDecorator('idcard', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入身份证号'} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="form.student.phone.label" />}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.student.phone.placeholder' })} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="form.student.choiceCampus" />}>
              {getFieldDecorator('campusId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
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
            <FormItem label={<FormattedMessage id="form.student.choiceCoach" />}>
              {getFieldDecorator('coachId', {
                rules: [
                  {
                    required: false,
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
            <FormItem label={'请选择季度'}>
              {getFieldDecorator('quarterId', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select placeholder="请选择季度">
                  {this.state.quartersList.map(item => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.describe}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem label="学员驾照状态">
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Select defaultValue={0} placeholder="请选择状态">
                  <Option value={0}>未拿驾照</Option>
                  <Option value={1}>已拿驾照</Option>
                </Select>
              )}
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

export default Student;
