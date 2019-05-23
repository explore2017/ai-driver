import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Select, Button, Card, Icon, InputNumber, message, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({}) => ({}))
@Form.create()
class Exam extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      campusList: [],
      subjectList: [],
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
    let api2 = 'http://localhost:8080/manage/showAllSubject';
    request(api2).then(res => {
      if (res.status == 0) {
        this.setState({
          subjectList: res.data,
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
        let api = 'http://localhost:8080/manage/addSubjectStudent';
        //TODO
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
      <PageHeaderWrapper title={'考试登记'} content={''}>
        <Card bordered={false}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem label={'电话号码'}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入电话号码'} />)}
            </FormItem>
            <FormItem label={'身份证'}>
              {getFieldDecorator('idcard', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入身份证'} />)}
            </FormItem>
            <FormItem label={<FormattedMessage id="form.student.subjectName" />}>
              {getFieldDecorator('subjectId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Select placeholder="请选择考试科目">
                  {this.state.subjectList.map(item => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.subjectName}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem label={'考试次数'}>
              {getFieldDecorator('count', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入考试次数'} />)}
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
            <FormItem label={'开考时间'}>
              {getFieldDecorator('startTime', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
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

export default Exam;
