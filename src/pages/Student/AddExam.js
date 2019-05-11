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
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AddExam.less';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ student, loading }) => ({
  student,
  submitting: loading.effects['student/addSubjectStudent'],
}))
@Form.create()
class AddExam extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log('99999');
      // console.log(this.props);
      // console.log(this.state);
      if (!err) {
        // console.log("88888");
        // dispatch({
        //   type: 'student/addSubjectStudent',
        //   payload: values,
        // });
        request('http://localhost:8080/student/addSubjectStudent', {
          method: 'POST',
          // headers: {
          //    "Content-type":"application/x-www-form-urlencoded"
<<<<<<< HEAD
          // },
          // body:"idcard=1&phone=2"
=======
          // },  
          // body:"idcard=1&phone=2"  
>>>>>>> d564c9a86bf0d77701c8fa0416f32af1ba97ea3d
          data: {
            phone: values.phone,
            idcard: values.idcard,
            position: values.position,
            startTime: values.date,
          },
<<<<<<< HEAD
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
=======
        }).then(function (response) {
          console.log(response);
          })
          .catch(function (error) {
          console.log(error);
          });
        }
>>>>>>> d564c9a86bf0d77701c8fa0416f32af1ba97ea3d
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

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

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.student.title" />}
        content={<FormattedMessage id="app.forms.student.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.student.choiceCampus" />}
            >
              {getFieldDecorator('title', {
                initialValue: '2',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                // <Input placeholder={formatMessage({ id: 'form.student.placeholder' })} />
                <Select style={{ width: 120 }}>
                  <Option value="1" disabled>
                    科目一
                  </Option>
                  <Option value="2">科目二</Option>
                  <Option value="3">科目三</Option>
                  <Option value="4" disabled>
                    科目四
                  </Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.student.position" />}>
              {getFieldDecorator('position', {
                initialValue: '2',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                // <Input placeholder={formatMessage({ id: 'form.student.placeholder' })} />
                <Select style={{ width: 120 }}>
                  <Option value="1" disabled>
                    花江
                  </Option>
                  <Option value="2">金鸡岭</Option>
                  <Option value="3">象鼻山</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.student.examTime" />}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.date.required' }),
                  },
                ],
              })(
                // <RangePicker
                //   style={{ width: '100%' }}
                //   placeholder={[
                //     formatMessage({ id: 'form.date.placeholder.start' }),
                //     formatMessage({ id: 'form.date.placeholder.end' }),
                //   ]}
                // />
                <DatePicker
                  placeholder={formatMessage({ id: 'form.student.placeholder.examTime' })}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.student.phone.label" />}
            >
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.student.phone.placeholder' })} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.student.idcard.label" />}
            >
              {getFieldDecorator('idcard', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.student.idcard.placeholder' })} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AddExam;
