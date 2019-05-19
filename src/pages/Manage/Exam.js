import React, { Component } from 'react';
import { connect } from 'dva';
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
import { isNullOrUndefined } from 'util';
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ exam, loading }) => ({
  exam,
  loading: loading.models.exam,
}))

@Form.create()
class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:{searchStudentName:'',},
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
    const {search} = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'exam/showSubjectStudent',
    });
  }

  handleSearchSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
        if(values.searchStudentName == ""){
          values.searchStudentName = null;
        }
        const params = {studentName: values.searchStudentName, status: values.searchStatus};
        dispatch({
          type: 'exam/showStudentExam',
          payload: params,
        });
        console.log(params)
    });
  };

  handleDelete(record) {
    let api="http://localhost:8080/manage/deleteSubjectStudent/"+record.id
    request(api,{
      method:'delete',
    }).then(res => {
      message.success(res.msg);
      this.initialList();
    }).catch(()=>{});
  }

  handleEdit(record) {
    this.setState({
      visible: true,
    });

    this.props.form.setFieldsValue({
      id:record.id,
      // subjectId:record.subjectId,
      // studentId: record.studentId,
      subjectName:record.subjectName,
      count: record.count,
      status: record.status,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'exam/reviewSubjectStudent',
          payload: values,
        });
        console.log(this.props)
        message.success("编辑成功");
        this.handleModalVisible();
        this.initialList();
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

    const {
      exam: { data },
      loading,
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
        dataIndex: 'id',
        key: 'id',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '考试科目',
        dataIndex: 'subjectName',
        key: 'subjectId',
      },
      {
        title: '学员姓名',
        dataIndex: 'studentName',
        key: 'studentName',
      },
      {
        title: '校区位置',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: '考试次数',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => {
          if (text == 0) {
            return <Tag color="red">未审核</Tag>;
          }
          if (text == 1) {
            return <Tag color="blue">未通过</Tag>;
          }
          if (text == 2) {
            return <Tag color="green">已通过</Tag>;
          }
        },
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
              {getFieldDecorator('searchStudentName', {
                rules: [
                  {
                    message:"请输入学员姓名",
                  },
                ],
              })(<Input placeholder={'请输入学员姓名'} />)}
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
                <Option value={0}>未审核</Option>
                <Option value={1}>未通过</Option>
                  <Option value={2}>已通过</Option>
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
          <Link to={'/register/exam'}>
            <Button type="primary" style={{ marginBottom: 20 }}>
              考试登记
            </Button>
          </Link>
          <Table dataSource={data.list} columns={columns} />
        </Card>
        <Modal
          title={'编辑'}
          visible={this.state.visible}
          onCancel={() => this.handleModalVisible()}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
          <FormItem >
              {getFieldDecorator('id'
              )(<span></span>)}
            </FormItem>
            <FormItem label={'考试科目'}>
              {getFieldDecorator('subjectName', {
                rules: [
                  {
                    required: true,
                    message:"请输入科目名称",
                  },
                ],
              })(<Input placeholder={'请输入科目名称'} />)}
            </FormItem>
            <FormItem label="考试次数">
              {getFieldDecorator('count', {
                rules: [
                  {
                    required: true,
                    message: "请输入考试次数",
                  },
                ],
              })(
                <Input placeholder={'请输入考试次数'} />
              )}
            </FormItem>
            <FormItem label="考试状态">
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select placeholder="请选择状态">
                <Option value={0}>未审核</Option>
                <Option value={1}>未通过</Option>
                  <Option value={2}>已通过</Option>
                </Select>
              )}
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
export default Exam;
