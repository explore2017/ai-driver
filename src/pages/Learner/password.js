import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import moment from 'moment';
import {
  Form,
  Input,
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
class Password extends PureComponent {

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const oldPwd = form.getFieldValue('newPwd');
        const confirmNewPwd = form.getFieldValue('confirmNewPwd');
        if(oldPwd!==confirmNewPwd){
          form.setFields({
            confirmNewPwd: {
              value: values.confirmNewPwd,
              errors: [new Error('两次密码输入不正确')],
            },
          });
          return;
        }
        const api = 'http://localhost:8080/student/password';
        request(api,{
          method: 'PUT', 
          data:{
            ...values
          }
        }).then((res)=>{
          if(res.status==0){
            message.success(res.msg);
            form.resetFields();
          }else{
            notification.warning({
              message: res.msg,
            })
          }
        }).catch(()=>{})
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
    
    return (
      <PageHeaderWrapper>
        <Card>
        <Form 
        onSubmit={this.handleSubmit} 
        hideRequiredMark 
        style={{ marginTop: 100,marginBottom:150 }}>
            <FormItem 
              {...formItemLayout} 
              label={'旧密码'}
              //validateStatus="error"
              //help="Should be combination of numbers & alphabets"
            >
              {getFieldDecorator('oldPwd', {
                rules: [
                  {
                    required: true,
                    message: '请输入旧密码',
                  },
                ],
              })(<Input.Password placeholder={'请输入旧密码'} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={'新密码'}>
              {getFieldDecorator('newPwd', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                ],
              })(<Input.Password placeholder={'请输入新密码'} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={'确认新密码'}>
              {getFieldDecorator('confirmNewPwd', {
                rules: [
                  {
                    required: true,
                    message: '请输入确认密码',
                  },
                ],
              })(<Input.Password placeholder={'请输入确认密码'} />)}
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

export default Password;