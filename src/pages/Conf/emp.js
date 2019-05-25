import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Card,
  Table,
  message,
  Divider,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tag,
  List,
  Icon,
  Row,
  Col
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@Form.create()
class Emp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      typeList: [],
      visible: false,
    };
  }

  componentDidMount() {
    this.initialList();
  }

  initialList(typeId) {
    request("http://localhost:8080/conf/emp").then((res) => {
      if (res.status == 0) {
        this.setState({
          list: res.data.campusVos
        })
      }
    }).catch(() => { });

  }

  handleDelete(record) {
    // record.id
    let api = "http://localhost:8080/news/deleteNews/" + record.id
    request(api, {
      method: 'delete',
    }).then(res => {
      message.success(res.msg);
      this.initialList(this.state.type);
    }).catch(() => { });

  }

  handleEdit(record) {
    this.setState({
      visible: true,
    });

    console.log(record)
    this.props.form.setFieldsValue({
      id: record.id,
      title: record.title,
      content: record.content,
      info: record.info,
      typeId: record.typeId,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        request("http://localhost:8080/news/reviseNews", {
          method: 'PUT',
          data: values,
        })
          .then(res => {
            if (res.status == '0') {
              message.success(res.msg);
              this.handleModalVisible();
              this.initialList(this.state.type);
            } else {
              message.error(res.msg);
            }
          })
          .catch(() => {
            message.error('编辑失败');
          });
      }
    });
  };

  handleModalVisible() {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  }

  render() {
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


    return (
      <PageHeaderWrapper>
        <Card>
          {
            this.state.list.map(item => {
              return (
                <div>
                  <Divider orientation="left">{item.campus.name}</Divider>
                  <Row gutter={16}>
                    {
                      item.confVos.map(conf => {
                        return (
                          <Col span={8}>
                            <Card>
                              <h2>{conf.desc}</h2>
                              <p>最大限制:{conf.max}</p>
                              <p>当前数量:{conf.current}</p>
                            </Card>
                          </Col>
                        )
                      })
                    }
                  </Row>
                </div>
              )
            })
          }
          <Divider />
        </Card>
        <Modal
          title={'编辑'}
          visible={this.state.visible}
          onCancel={() => this.handleModalVisible()}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label={'标题'}
            >
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入标题'} />)}
            </FormItem>
            <FormItem
              label={'类型'}
            >
              {getFieldDecorator('typeId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Select placeholder='请选择类型'>
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
              label={'简介'}
            >
              {getFieldDecorator('info', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<TextArea rows={2} placeholder={'请输入简介'} />)}
            </FormItem>
            <FormItem
              label={'内容'}
            >
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<TextArea rows={5} placeholder={'请输入内容'} />)}
            </FormItem>
            <FormItem >
              {getFieldDecorator('id'
              )(<span></span>)}
            </FormItem>
            <FormItem style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default Emp;
