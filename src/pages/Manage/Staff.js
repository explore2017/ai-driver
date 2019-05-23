import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, message, Divider, Popconfirm, Button, Modal, Form, Input, Select } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import request from '@/utils/request';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      campusList: [],
      visible: false
    };
  }

  componentDidMount() {
    this.initialList();
  }

  initialList() {
    let api = "http://localhost:8080/staff/";
    request(api).then((res) => {
      if (res.status == 0) {
        this.setState({
          list: res.data
        })
      }
    }).catch(()=>{});
    request("http://localhost:8080/manage/showAllCampus").then((res) => {
      if (res.status == 0) {
        this.setState({
          campusList: res.data
        })
      }
    });
  }

  handleDelete(record) {
    let api = "http://localhost:8080/staff/" + record.id
    request(api, { method: 'DELETE' }).then((res) => {
      if (res.status == 0) {
        message.success(res.msg);
        this.initialList();
      } else {
        message.info(res.msg);
      }
    }).catch(() => { });

  }

  handleEdit(record) {
    this.setState({
      visible: true
    })
    this.props.form.setFieldsValue({
      id: record.id,
      name: record.name,
      jobNum: record.jobNum,
      role: record.role,
      phone: record.phone,
      email: record.email,
      campusId: record.campusId,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let api = "http://localhost:8080/staff/"
        request(api, {
          method: 'PUT',
          data: values
        }).then((res) => {
          if (res.status == 0) {
            this.initialList();
            message.success(res.msg);
          } else {
            message.error(res.msg);
          }
        }).catch(() => {
          message.error('编辑失败');
        })
        this.handleModalVisible();
      }
    });
  };

  handleModalVisible() {
    this.setState({
      visible: false
    })
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
        dataIndex: 'staff.name',
        key: 'name',
      },
      {
        title: '工号',
        dataIndex: 'staff.jobNum',
        key: 'jobNum',
      },
      {
        title: '职位',
        dataIndex: 'staff.role',
        key: 'role',
      },
      {
        title: '校区',
        dataIndex: 'campus.name',
        key: 'campusName',
      },
      {
        title: '电话',
        dataIndex: 'staff.phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'staff.email',
        key: 'email',
      },
      {
        title: '操作',
        key: 'operator',
        render: record => {
          return (
            <span>
              <a onClick={() => this.handleEdit(record.staff)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="你确认删除吗?"
                onConfirm={() => this.handleDelete(record.staff)}
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
          <Link to="/register/staff">
            <Button type="primary" style={{ marginBottom: 20 }}>
              员工登记
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
          <Form
            onSubmit={this.handleSubmit}>
            <FormItem
            >
              {getFieldDecorator('id')(
                <span></span>
              )}
            </FormItem>
            <FormItem
              label={'姓名'}
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入姓名'} />)}
            </FormItem>
            <FormItem
              label={'工号'}
            >
              {getFieldDecorator('jobNum', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入工号'} />)}
            </FormItem>
            <FormItem
              label={'职位'}
            >
              {getFieldDecorator('role', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入职位'} />)}
            </FormItem>
            <FormItem
              label={<FormattedMessage id="form.student.choiceCampus" />}
            >
              {getFieldDecorator('campusId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Select placeholder='请选择校区'>
                  {
                    this.state.campusList.map((item) => {
                      return (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem
              label={<FormattedMessage id="form.student.phone.label" />}
            >
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.student.phone.placeholder' })} />)}
            </FormItem>
            <FormItem
              label={'邮箱'}
            >
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: false,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={'请输入邮箱'} />)}
            </FormItem>
            <FormItem style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" >
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
