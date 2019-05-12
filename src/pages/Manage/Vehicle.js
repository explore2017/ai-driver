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
      coachList: [],
      visible: false,
    };
  }

  componentDidMount() {
    this.initialList();
  }

  initialList() {
    request('http://localhost:8080/vehicle/showVehicles').then(res => {
      if (res.status === 0) {
        this.setState({
          list: res.data,
        });
      }
    });
    let api = 'http://localhost:8080/manage/showAllCampus';
    request(api).then(res => {
      if (res.status == 0) {
        this.setState({
          campusList: res.data,
        });
      }
    });
    request('http://localhost:8080/manage/Coaches').then(res => {
      if (res.status == 0) {
        this.setState({
          coachList: res.data,
        });
      }
    });
  }

  handleDelete(record) {
    // record.id
    let api = 'http://localhost:8080/vehicle/deleteVehicle/' + record.vehicle.id;
    request(api, { method: 'delete' }).then(res => {
      if (res.status == '0') {
        message.success(res.msg);
        this.initialList();
      } else {
        message.error(res.msg);
      }
    });
  }

  handleEdit(record) {
    this.setState({
      visible: true,
    });
    this.props.form.setFieldsValue({
      id: record.id,
      name: record.name,
      purchaseTime: record.purchaseTime.format('YYYY-MM-DD '),
      status: record.status,
      coachId: record.coachId,
      campusId: record.compusId,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // TODO
        let api = 'http://localhost:8080/vehicle/reviseVehicle';
        request(api, {
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

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '车牌号',
        dataIndex: 'vehicle.name',
        key: 'name',
      },
      {
        title: '所属教练',
        dataIndex: 'coachName',
        key: 'coachName',
      },
      {
        title: '所属校区',
        dataIndex: 'campusName',
        key: 'campusName',
      },
      {
        title: '车辆状态',
        dataIndex: 'vehicle.status',
        key: 'status',
        render: text => {
          if (text == 0) {
            return <Tag color="red">无法使用</Tag>;
          }
          if (text == 1) {
            return <Tag color="green">可以使用</Tag>;
          }
          if (text == 2) {
            return <Tag color="green">正在维修</Tag>;
          }
        },
      },
      {
        title: '购买时间',
        dataIndex: 'vehicle.purchaseTime',
        key: 'purchaseTime',
      },
      {
        title: '操作',
        key: 'operator',
        render: record => {
          return (
            <span>
              <a onClick={() => this.handleEdit(record.vehicle)}>编辑</a>
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
          <Table dataSource={this.state.list} columns={columns} />
        </Card>
        <Modal
          title={'编辑'}
          visible={this.state.visible}
          onCancel={() => this.handleModalVisible()}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem>{getFieldDecorator('id')(<span />)}</FormItem>
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
                  {this.state.coachList.map(item => {
                    return (
                      <Option value={item.coach.id} key={item.coach.id}>
                        {item.coach.name}
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
