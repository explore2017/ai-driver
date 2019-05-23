import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Row, 
  Col,
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
class Student extends Component {
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
    let api = 'http://localhost:8080/manage/students';
    request(api).then(res => {
      if (res.status === 0) {
        this.setState({
          list: res.data,
        });
      }
    }).catch(()=>{

    });
    request('http://localhost:8080/manage/showAllCampus').then(res => {
      if (res.status == 0) {
        this.setState({
          campusList: res.data,
        });
      }
    }).catch(()=>{
      
    });
    request('http://localhost:8080/manage/Coaches').then(res => {
      if (res.status == 0) {
        this.setState({
          coachList: res.data,
        });
      }
    }).catch(()=>{
      
    });
  }

  handleSearchSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
        const params = {campusId: values.searchCampusId, status: values.searchStatus};
        console.log(params)
        let api = 'http://localhost:8080/manage/showStudents/';
        request(api, { method: 'Post', data: {
          ...params,
        }, }).then(res => {
          if (res.status == '0') {
            this.setState({
              list: res.data,
            });
          } else {
            message.error(res.msg);
          }
        });
    });
  };

  handleDelete(record) {
    // record.id
    let api = 'http://localhost:8080/manage/deleteStudent/' + record.student.id;
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
      id: record.student.id,
      name: record.student.name,
      sex: record.student.sex,
      status: record.student.status,
      phone: record.student.phone,
      campusId: record.student.campusId,
      coachId: record.student.coachId,
      password: record.student.password,
      idcard: record.student.idcard,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // TODO
        let api = 'http://localhost:8080/manage/reviseStudent';
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
        title: '姓名',
        dataIndex: 'student.name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'student.sex',
        key: 'sex',
      },
      {
        title: '电话',
        dataIndex: 'student.phone',
        key: 'phone',
      },
      {
        title: '所属教练',
        dataIndex: 'coach.name',
        key: 'coachName',
      },
      {
        title: '所属校区',
        dataIndex: 'campus.name',
        key: 'campusName',
      },
      {
        title: '学员状态',
        dataIndex: 'student.status',
        key: 'status',
        render: text => {
          if (text == 0) {
            return <Tag color="red">未拿驾照</Tag>;
          }
          if (text == 1) {
            return <Tag color="green">已拿驾照</Tag>;
          }
        },
      },
      {
        title: '学员密码',
        dataIndex: 'student.password',
        key: 'password',
      },
      {
        title: '身份证号',
        dataIndex: 'student.idcard',
        key: 'idcard',
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
        <Form onSubmit={this.handleSearchSubmit}>
          <Row>
            <Col span={8} push={2}>
            <FormItem>
              {getFieldDecorator('searchCampusId', {
                rules: [
                  {
                    message: '请选择校区',
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
            </Col>
            <Col span={8} push={4}>
              <FormItem>
              {getFieldDecorator('searchStatus', {
                rules: [
                  {
                  },
                ],
              })(
                <Select placeholder="请选择状态">
                  <Option value={0}>未拿驾照</Option>
                  <Option value={1}>已拿驾照</Option>
                </Select>
              )}
            </FormItem>
            </Col>
            <Col span={6} push={5}>
            <FormItem>
            <Button type="primary" htmlType="submit">
                <FormattedMessage id="form.filter" />
                    </Button>
                </FormItem>
            </Col>
          </Row>
          </Form>
        </Card>

        <Card>
          <Link to={'/register/student'}>
            <Button type="primary" style={{ marginBottom: 20 }}>
              学员登记
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
            <FormItem label={'姓名'}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入学员姓名',
                  },
                ],
              })(<Input placeholder={'请输入学员姓名'} />)}
            </FormItem>
            <FormItem label="所属教练">
              {getFieldDecorator('coachId', {
                rules: [
                  {
                    required: true,
                    message: '请选择教练',
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
                    message: '请选择校区',
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
                  },
                ],
              })(
                <Select placeholder="请选择状态">
                  <Option value={0}>未拿驾照</Option>
                  <Option value={1}>已拿驾照</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="电话号码">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: false,
                    message: '请输入电话号码',
                  },
                ],
              })(<Input />)}
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
export default Student;
