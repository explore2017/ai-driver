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
import styles from './ChoiceCoach.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class ChoiceCoach extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
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
              {getFieldDecorator('campus', {
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
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.student.choiceCoach" />}
            >
              {getFieldDecorator('coach', {
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
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.student.price" />}>
              {getFieldDecorator('price', {
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
                    1000
                  </Option>
                </Select>
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

export default ChoiceCoach;
