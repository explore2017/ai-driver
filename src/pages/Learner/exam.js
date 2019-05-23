import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, message, Divider, Popconfirm, Button, Modal, Form, Input, Select } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import request from '@/utils/request';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      visible: false
    };
  }

  componentDidMount() {
    this.initialList();
  }

  initialList() {
    const api = "http://localhost:8080/student/exam"
    request(api).then((res) => {
      if (res.status === 0) {
        this.setState({
          list: res.data
        })
      }
    }).catch(() => {
    });
  }

  handleCancel(record) {
    const api = "http://localhost:8080/student/exam/cancel/"+record.id
    request(api,{
      method:'PUT'
    }).then((res) => {
        this.initialList();
        message.info(res.msg)
    }).catch(() => {

    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //TODO
        request(api, {
          method: 'PUT',
          body: values
        }).then((res) => {
          message.info(res.msg);
        }).catch(() => {
          message.error('编辑失败');
        })
        this.handleModalVisible();
        initialList();
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
        title: '科目',
        dataIndex: 'subject.subjectName',
        key: 'subjectId',
      },
      {
        title: '考场',
        dataIndex: 'subjectStudent.position',
        key: 'position',
      },
      {
        title: '开始时间',
        dataIndex: 'subjectStudent.startTime',
        key: 'startTime',
      },
      {
        title: '当前状态',
        dataIndex: 'subjectStudent.status',
        key: 'status',
        render: (text) => {
          var span;
          switch (text) {
            case 0: span = <span style={{ color: 'orange' }}>待审核</span>; break;
            case 1: span = <span style={{ color: 'green' }}>审核通过</span>; break;
            case 2: span = <span style={{ color: 'red' }}>审核不通过</span>; break;
            case 3: span = <span style={{ color: 'green' }}>考试通过</span>; break;
            case 4: span = <span style={{ color: 'red' }}>考试不通过</span>; break;
            case 5: span = <span style={{ color: 'red' }}>已取消</span>; break;
            default: span = <span>未知状态</span>;
          }
          return (
            span
          )
        }
      },
      {
        title: '操作',
        key: 'operator',
        render: record => {
          if (record.subjectStudent.status == 0) {
            return (
              <span>
                <a onClick={() => this.handleCancel(record.subjectStudent)}>取消</a>
              </span>
            )
          }else{
            return (
              <span>
                <a disabled>取消</a>
              </span>
            )
          }
        },
      },
    ];

    return (
      <PageHeaderWrapper>
        <Card>
          <Link to="/learner/sign">
            <Button type="primary" style={{ marginBottom: 20 }}>
              去报名
            </Button>
          </Link>
          <Table dataSource={this.state.list} columns={columns} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
