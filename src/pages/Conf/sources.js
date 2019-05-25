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
class Sources extends Component {
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

  initialList() {
    request("http://localhost:8080/conf/sources").then((res) => {
      if (res.status == 0) {
        this.setState({
          list: res.data.campusVos
        })
      }
    }).catch(() => { });

  }

  handleEdit(record,campus) {
    this.setState({
      visible: true,
    });

    this.props.form.setFieldsValue({
      code: record.code,
      max: record.max,
      campusId: campus.id,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        request("http://localhost:8080/conf/update", {
          method: 'PUT',
          data: values,
        })
          .then(res => {
            if (res.status == '0') {
              message.success(res.msg);
              this.handleModalVisible();
              this.initialList();
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
                          <Col span={12}>
                            <Card actions={[<Icon onClick={()=>this.handleEdit(conf,item.campus)} type="edit" />]}>
                              <h2>{conf.desc}</h2>
                              <p>最大限制: {conf.max}</p>
                              <p>当前数量: {conf.current}</p>
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
              label={'最大限制'}
            >
            <FormItem >
              {getFieldDecorator('campusId'
              )(<span></span>)}
            </FormItem>
              {getFieldDecorator('max', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入最大限制'} />)}
            </FormItem>
            <FormItem >
              {getFieldDecorator('code'
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
export default Sources;
