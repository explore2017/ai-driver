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
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import request from '@/utils/request';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      campusList: [],
      visible: false,
      visibleAddModal: false,
    };
  }

  componentDidMount() {
    this.initialList();
  }

  initialList() {
    //  request("api").then((res)=>{
    // 	if(res.status===0){
    // 		this.setState({
    // 			list:res.data
    // 		})
    // 	}
    // });
  }

  handleDelete(record) {
    // record.id
    request(api).then(res => {
      message.info(res.msg);
    });
    initialList();
  }

  handleEdit(record) {
    this.setState({
      visible: true,
    });
    this.props.form.setFieldsValue({
      name: record.name,
      purchaseTime: record.purchaseTime,
      status: record.status,
      coach: record.coachId,
      campusId: record.campusId,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // TODO
        request(api, {
          method: 'PUT',
          body: values,
        })
          .then(res => {
            message.info(res.msg);
          })
          .catch(() => {
            message.error('编辑失败');
          });
        this.handleModalVisible();
        initialList();
      }
    });
  };

  handleModalVisible() {
    this.setState({
      visible: false,
      visibleAddModal: false,
    });
    this.props.form.resetFields();
  }
  handleAddSubmit(e) {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // TODO
        request(api, {
          method: 'post',
          body: values,
        })
          .then(res => {
            message.info(res.msg);
          })
          .catch(() => {
            message.error('失败');
          });
        this.handleModalVisible();
        initialList();
      }
    });
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

    const source = [
      {
        id: 1,
        name: 'name',
        jobNum: 'jobNum',
        campusId: 'compusId',
        status: 0,
      },
    ];

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '车牌号',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所属教练',
        dataIndex: 'coachId',
        key: 'coachId',
      },
      {
        title: '所属校区',
        dataIndex: 'campusId',
        key: 'campusId',
      },
      {
        title: '车辆状态',
        dataIndex: 'status',
        key: 'status',
        render: text => {
          if (text == 0) {
            return <Tag color="red">无法使用</Tag>;
          }
          if (text == 1) {
            return <Tag color="green">可以使用</Tag>;
          }
          if (text == 3) {
            return <Tag color="green">可以使用</Tag>;
          }
        },
      },
      {
        title: '购买时间',
        dataIndex: 'purchaseTime',
        key: 'purchaseTime',
      },
      {
        title: '操作',
        key: 'operator',
        render: record => {
          return (
            <span>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="你确认删除吗?"
                onConfirm={() => this.handleDelete(record)}
                okText="Yes"
                cancelText="No"
              >
                <a style={{ color: 'red' }}>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    return (
      <PageHeaderWrapper>
        <Card>
          <Link to={'/register/vehicle'}>
            <Button type="primary" style={{ marginBottom: 20 }}>
              车辆登记
            </Button>
          </Link>
          <Table dataSource={source} columns={columns} />
        </Card>
        <Modal
          title={'编辑'}
          visible={this.state.visible}
          onCancel={() => this.handleModalVisible()}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem label={'车牌号'}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入车牌号'} />)}
            </FormItem>
            <FormItem label="所属教练">
              {getFieldDecorator('coachId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Select placeholder="请选择教练">
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
            <FormItem label="所属校区">
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
            <FormItem label="修改状态">
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Select placeholder="请选择状态">
                  <Option value={0}>无法使用</Option>
                  <Option value={1}>可以使用</Option>
                  <Option value={2}>正在维修</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="购买时间">
              {getFieldDecorator('purchase_time', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<DatePicker />)}
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
export default Vehicle;
