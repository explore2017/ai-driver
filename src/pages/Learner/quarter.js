import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Table, message, Divider, Popconfirm, Button, Modal, Form, Input, Select } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import request from '@/utils/request';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
export default class Quarter extends Component {
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
    request('api').then((res) => {
      if (res.status === 0) {
        this.setState({
          list: res.data
        })
      }
    }).catch(() => {
    });
  }

  handleEdit(record) {
    this.setState({
      visible: true
    })
    this.props.form.setFieldsValue({
      name: record.name,
      jobNum: record.jobNum,
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


    const source = [
      {
        id: 1,
        subjectId: '科目一',
        startTime: '2019-05-20',
        position:'金鸡岭考场',
        status:0
      },
      {
        id: 2,
        subjectId: '科目二',
        startTime: '2019-05-20',
        position:'金鸡岭考场',
        status:1
      },
      {
        id: 3,
        subjectId: '科目三',
        startTime: '2019-05-20',
        position:'金鸡岭考场',
        status:2
      },
      {
        id: 3,
        subjectId: '科目三',
        startTime: '2019-05-20',
        position:'金鸡岭考场',
        status:3
      },
      {
        id: 3,
        subjectId: '科目三',
        startTime: '2019-05-20',
        position:'金鸡岭考场',
        status:4
      },
      {
        id: 3,
        subjectId: '科目三',
        startTime: '2019-05-20',
        position:'金鸡岭考场',
        status:5
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
        title: '科目',
        dataIndex: 'subjectId',
        key: 'subjectId',
      },
      {
        title: '考场',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: '当前状态',
        dataIndex: 'status',
        key: 'status',
        render:(text)=>{
          var span;
          switch(text){
            case 0: span = <span style={{color:'orange'}}>待审核</span>;break;
            case 1: span = <span style={{color:'green'}}>审核通过</span>;break;
            case 2: span = <span style={{color:'red'}}>审核不通过</span>;break;
            case 3: span = <span style={{color:'green'}}>考试通过</span>;break;
            case 4: span = <span style={{color:'red'}}>考试不通过</span>;break;
            default:span = <span>未知状态</span>;
          }
          return(
            span
          )
        }
      },
      {
        title: '操作',
        key: 'operator',
        render: record => {
          return (
            <span>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
            </span>
          );
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
          <Table dataSource={source} columns={columns} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
