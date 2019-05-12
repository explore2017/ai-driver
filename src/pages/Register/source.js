import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Select, Button, Card, Icon, InputNumber, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({}) => ({}))
@Form.create()
class Coach extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      campusList: [],
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
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let api = 'http://localhost:8080/source/addSource';
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
      <PageHeaderWrapper title={'物资登记'} content={''}>
        <Card bordered={false}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem label={'名称'}>
              {getFieldDecorator('sourceName', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入名称'} />)}
            </FormItem>
            <FormItem label={'位置'}>
              {getFieldDecorator('sourcePosition', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入物资所处位置'} />)}
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
            <FormItem label={'单价（元）'}>
              {getFieldDecorator('sourceValue', {
                rules: [
                  {
                    required: true,
                    message: '请输入单价',
                  },
                ],
              })(<InputNumber precision={1} />)}
            </FormItem>

            <FormItem label={'当前状态'}>
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Select placeholder="请选择当前状态">
                  <Option value={0} key="0">
                    未使用
                  </Option>
                  <Option value={1} key="1">
                    正在使用
                  </Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={'数量'}>
              {getFieldDecorator('total', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder="请输入物资数量" />)}
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

export default Coach;
