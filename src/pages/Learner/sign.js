import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Result from '@/components/Result';
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
  Steps,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Step = Steps.Step;

@connect(({ student }) => ({
  student,
}))
@Form.create()
class Sign extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      isSuccess: false
    }
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        request('http://localhost:8080/student/sign', {
          method: 'POST',
          data:values
        }).then((res) => {
          message.info(res.msg);
          if (res.status == 0) {
            this.setState({
              currentStep: 2,
              isSuccess: true
            })
          }
        }).catch(() => {
          message.error('请求失败');
        })
      }
    });
  };

  render() {
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

    if (this.state.isSuccess) {
      return (
        <PageHeaderWrapper
          title={<FormattedMessage id="app.forms.student.title" />}
          content={<FormattedMessage id="app.forms.student.description" />}
        >
          <Card bordered={false}>
          <div style={{ width: 700, margin: '0 auto', marginBottom: 70, marginTop: 30 }}>
              <Steps size="small" current={this.state.currentStep}>
                <Step title="信息填写" />
                <Step title="提交信息" />
                <Step title="报名成功" />
              </Steps>
            </div>
            <Result
              type="success"
              title="报名成功"
              description="等待审核，可到我的考试查询审核状态。"
            />
          </Card>
        </PageHeaderWrapper>
      )
    } else {
      return (
        <PageHeaderWrapper
          title={<FormattedMessage id="app.forms.student.title" />}
          content={<FormattedMessage id="app.forms.student.description" />}
        >
          <Card bordered={false}>
            <div style={{ width: 700, margin: '0 auto', marginBottom: 50, marginTop: 30 }}>
              <Steps size="small" current={this.state.currentStep}>
                <Step title="信息填写" />
                <Step title="提交信息" />
                <Step title="报名成功" />
              </Steps>
            </div>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem
                {...formItemLayout}
                label={'考试科目'}
              >
                {getFieldDecorator('subjectId', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.title.required' }),
                    },
                  ],
                })(
                  <Select placeholder={'请选择考试科目'}>
                    <Option value="1">科目一</Option>
                    <Option value="2">科目二</Option>
                    <Option value="3">科目三</Option>
                    <Option value="4">科目四</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.student.position" />}>
                {getFieldDecorator('position', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.title.required' }),
                    },
                  ],
                })(
                  <Input placeholder={'请输入考场地点'} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={<FormattedMessage id="form.student.examTime" />}>
                {getFieldDecorator('startTime', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.date.required' }),
                    },
                  ],
                })(
                  <DatePicker
                    placeholder={formatMessage({ id: 'form.student.placeholder.examTime' })}
                  />
                )}
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="form.submit" />
                </Button>
              </FormItem>
            </Form>
          </Card>
        </PageHeaderWrapper>
      );
    }
  }
}

export default Sign;
