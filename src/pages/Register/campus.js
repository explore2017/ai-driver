import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Select, Button, Card, Icon, DatePicker,message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({}) => ({}))
@Form.create()
class Campus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      campusList: [],
    };
  }

  componentDidMount() {
    // request(api).then((res)=>{
    //   if(res.status==0){
    //     this.setState({
    //       campusList:res.data
    //     })
    //   }
    // });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        request("http://localhost:8080/campus/insertCampus", {
          method: 'POST',
          data: values,
        })
          .then(res => {
            if(res.status=='0'){
              message.success(res.msg);
              this.props.form.resetFields();
            }else{
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
      <PageHeaderWrapper title={'校区登记'} content={''}>
        <Card bordered={false}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label={'校区名称'}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入校区名称',
                  },
                ],
              })(<Input placeholder={'请输入校区名称'} />)}
            </FormItem>
            <FormItem label="校区描述">
              {getFieldDecorator('info', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
             <Input.TextArea placeholder={'请输入校区描述'}/>
              )}
            </FormItem>
            <FormItem label="校区位置">
              {getFieldDecorator('position', {
                rules: [
                  {
                    required: true,
                    message: '请输入校区位置',
                  },
                ],
              })(
               <Input placeholder={'请输入校区位置'} />
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

export default Campus;
