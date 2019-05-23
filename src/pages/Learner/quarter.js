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
      quarterList: [],
      visible: false
    };
  }

  componentDidMount() {
    this.initialList();
  }

  initialList() {
    let api = 'http://localhost:8080/quarters/allQuarters';
    request(api,{method:'GET'}).then(res => {
      if (res.status == 0) {
        this.setState({
          quarterList: res.data,
        });
      }
    }).catch(() => {
    });
  }

  handleEdit(record) {
    this.setState({
      visible: true
    })
    this.props.form.setFieldsValue({
      id: record.id,
      years: record.years,
      quarters: record.quarters,
      planNumber: record.planNumber,
      status: record.status,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //TODO
        console.log(values)
        let api = 'http://localhost:8080/quarters/reviseQuarters';
        request(api, {
          method: 'PUT',
          data: values
        }).then((res) => {
          message.info(res.msg);
        }).catch(() => {
          message.error('编辑失败');
        })
        this.handleModalVisible();
        this.initialList();
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


    const {quarterList} = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '年份',
        dataIndex: 'years',
        key: 'years',
      },
      {
        title: '季度',
        dataIndex: 'quarters',
        key: 'quarters',
        // render:(text)=>{
        //   var span;
        //   switch(text){
        //     case 1: span = <span style={{color:'green'}}>第一季度</span>;break;
        //     case 2: span = <span style={{color:'green'}}>第二季度</span>;break;
        //     case 3: span = <span style={{color:'green'}}>第三季度</span>;break;
        //     case 4: span = <span style={{color:'green'}}>第四季度</span>;break;
        //     default:span = <span>未知状态</span>;
        //   }
        //   return(
        //     span
        //   )
        // }
      },
      {
        title: '计划招生人数',
        dataIndex: 'planNumber',
        key: 'planNumber',
      },
      {
        title: '当前状态',
        dataIndex: 'status',
        key: 'status',
        render:(text)=>{
          var span;
          switch(text){
            case 0: span = <span style={{color:'red'}}>待修改</span>;break;
            case 1: span = <span style={{color:'green'}}>已修改</span>;break;
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
          <Table dataSource={quarterList} columns={columns} />
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
            <FormItem label={'年份'}>
              {getFieldDecorator('years', {
                rules: [
                  {
                    required: true,
                    message:"请输入年份",
                  },
                ],
              })(<Input placeholder={'请输入年份'} />)}
            </FormItem>
            <FormItem label={'季度'}>
              {getFieldDecorator('quarters', {
                rules: [
                  {
                    required: true,
                    message:"请输入季度",
                  },
                ],
              })(<Input placeholder={'请输入季度'} />)}
            </FormItem>
            <FormItem label="">
              {getFieldDecorator('planNumber', {
                rules: [
                  {
                    required: true,
                    message: "请输入计划招生人数",
                  },
                ],
              })(
                <Input placeholder={'请输入计划招生人数'} />
              )}
            </FormItem>
            <FormItem label="状态">
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select placeholder="请选择状态">
                <Option value={0}>未修改</Option>
                <Option value={1}>已修改</Option>
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
