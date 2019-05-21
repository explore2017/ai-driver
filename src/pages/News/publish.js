import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Icon,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;


@connect(({ }) => ({}))
@Form.create()
class Coach extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      typeList:[],
    }
  }

  componentDidMount() {
    let api="http://localhost:8080/news/allType"
    request(api).then((res)=>{
      if(res.status==0){
        this.setState({
          typeList:res.data
        })
      }
    }).catch(()=>{
      
    });

  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let api="http://localhost:8080/news/addNews"
        request(api,{
          method:'POST',
          data:values
        }).then((res)=>{
          if(res.status==0){
            message.success(res.msg);
            this.props.form.resetFields();
          }else{
            message.error(res.msg);
          }
        }).catch(()=>{
          message.error('登记失败');
        })
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
      <PageHeaderWrapper title={'新闻信息发布'} content={''}>
        <Card bordered={false}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem
              label={'新闻标题'}
            >
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入新闻标题'} />)}
            </FormItem>
            <FormItem
              label={'新闻类型'}
            >
              {getFieldDecorator('typeId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Select placeholder='请选择新闻类型'>
              {
                this.state.typeList.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>{item.type}</Option>
                  )
                })
              }
            </Select>)}
            </FormItem>
            <FormItem
              label={'新闻简介'}
            >
              {getFieldDecorator('info', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<TextArea rows={2} placeholder={'请输入新闻简介'}/>)}
            </FormItem>
            <FormItem
              label={'新闻内容'}
            >
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<TextArea rows={5} placeholder={'请输入新闻内容'}/>)}
            </FormItem>
            <FormItem {...tailFormItemLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                发布
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Coach;
