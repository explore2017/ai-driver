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
class Source extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      campusList: [],
      coachList:[],
      visible: false,
      visibleAddModal: false,
    };
  }

  componentDidMount() {
    this.initialList();
  }

  initialList() {
    //获取校区
     request("http://localhost:8080/manage/showAllCampus").then((res)=>{
    	if(res.status==0){
    		this.setState({
    			campusList:res.data
    		})
    	}
    });
    //获取资源
    request("http://localhost:8080/source/showSources").then((res)=>{
    	if(res.status==0){
    		this.setState({
    			list:res.data
        })
        console.log(res.data)
    	}
    });
  }

  handleDelete(record) {
    // record.id
    request(api).then(res => {
      if(res.status=='0'){
        initialList();
        message.success(res.msg);
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
      sourceName: record.source.sourceName,
      campusId: record.campus.id,
      status: record.source.status,
      sourcePosition: record.source.sourcePosition,
      sourceValue:record.source.sourceValue,
      total:record.source.total,
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
      visibleAddModal: false,
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
        title: '资源名称',
        dataIndex: 'source.sourceName',
        key: 'name',
      },
      {
        title: '所属校区',
        dataIndex: 'campus.name',
        key: 'campusName',
      },{
        title: '资源位置',
        dataIndex: 'source.sourcePosition',
        key: 'position',
      },
      {
        title: '资源价值',
        dataIndex: 'source.sourceValue',
        key: 'value',
      },
      {
        title: '资源数量',
        dataIndex: 'source.total',
        key: 'total',
      },
      {
        title: '资源状态',
        dataIndex: 'source.status',
        key: 'status',
        render: text => {
          if (text == 0) {
            return <Tag color="red">未使用</Tag>;
          }
          if (text == 1) {
            return <Tag color="green">正在使用</Tag>;
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
          <Link to={'/register/source'}>
            <Button type="primary" style={{ marginBottom: 20 }}>
              物资登记
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
            <FormItem label={'资源名称'}>
              {getFieldDecorator('sourceName', {
                rules: [
                  {
                    required: true,
                    message: "请输入资源名称",
                  },
                ],
              })(<Input placeholder={'请输入资源名称'} />)}
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
            <FormItem label={'资源位置'}>
              {getFieldDecorator('sourcePosition', {
                rules: [
                  {
                    required: false,
                    message: "请输入资源位置",
                  },
                ],
              })(<Input placeholder={'请输入资源位置'} />)}
            </FormItem>
            <FormItem label={'资源价值'}>
              {getFieldDecorator('sourceValue', {
                rules: [
                  {
                    required: true,
                    message: "请输入资源价值",
                  },
                ],
              })(<Input placeholder={'请输入资源价值'} />)}
            </FormItem>
            <FormItem label={'资源数量'}>
              {getFieldDecorator('total', {
                rules: [
                  {
                    required: true,
                    message: "请输入资源数量",
                  },
                ],
              })(<Input placeholder={'请输入资源数量'} />)}
            </FormItem>
            <FormItem label="状态">
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(
                <Select placeholder="请选择状态">
                  <Option value={0}>未使用</Option>
                  <Option value={1}>正在使用</Option>
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
export default Source;
