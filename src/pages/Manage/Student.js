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
class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      campusList: [],
      coachList:[],
      visible: false,
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
      if(res.status=='0'){
        message.success(res.msg);
        initialList();
      }else{
        message.error(res.msg);
      }
    });

  }

  handleEdit(record) {
    this.setState({
      visible: true,
    });
    this.props.form.setFieldsValue({
      name: record.name,
      sex: record.sex,
      status: record.status,
      phone: record.phone,
      campusId: record.campusId,
      coachId:record.coachId,
      password:record.password,
      idcard:record.idcard,
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
            if(res.status=='0'){
              message.success(res.msg);
            }else{
              message.error(res.msg);
            }
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
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },{
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
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
        title: '学员状态',
        dataIndex: 'status',
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
        dataIndex: 'password',
        key: 'password',
      },{
        title: '身份证号',
        dataIndex: 'idcard',
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
          <Link to={'/register/student'}>
            <Button type="primary" style={{ marginBottom: 20 }}>
              学员登记
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
            <FormItem label={'姓名'}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: "请输入学员姓名",
                  },
                ],
              })(<Input placeholder={'请输入学员姓名'} />)}
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
                    message:"请输入电话号码",
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
export default Student;
