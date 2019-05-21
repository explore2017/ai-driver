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
class List extends Component {
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
    request("http://localhost:8080/news/searchAllNews").then((res) => {
      if (res.status == 0) {
        this.setState({
          list: res.data
        })
      }
    }).catch(() => { });
  }

  handleDelete(record) {
    // record.id
    let api = "http://localhost:8080/campus/deleteCampus/" + record.id
    request(api, {
      method: 'delete',
    }).then(res => {
      message.success(res.msg);
      this.initialList();
    }).catch(() => { });

  }

  handleEdit(record) {
    this.setState({
      visible: true,
    });
    this.props.form.setFieldsValue({
      id: record.id,
      name: record.name,
      position: record.position,
      info: record.info,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // TODO
        request("http://localhost:8080/campus/reviseCampus", {
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
        title: '标题',
        dataIndex: 'news.title',
        key: 'news.title',
      },      {
        title: '新闻类型',
        dataIndex: 'newsType.type',
        key: 'newsType.type',
      },
      {
        title: '简介',
        dataIndex: 'news.info',
        key: 'news.info',
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
          <Link to={'/News/publish'}>
            <Button type="primary" style={{ marginBottom: 20 }}>
              信息发布
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
            <FormItem >
              {getFieldDecorator('id'
              )(<span></span>)}
            </FormItem>
            <FormItem label={'校区名称'}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: "请输入校区名称",
                  },
                ],
              })(<Input placeholder={'请输入校区名称'} />)}
            </FormItem>
            <FormItem label="校区信息">
              {getFieldDecorator('info', {
                rules: [
                  {
                    required: false,
                    message: "请输入校区信息",
                  },
                ],
              })(
                <Input placeholder={'请输入校区信息'} />
              )}
            </FormItem>
            <FormItem label="校区位置">
              {getFieldDecorator('position', {
                rules: [
                  {
                    required: true,
                    message: "请输入校区位置",
                  },
                ],
              })(
                <Input placeholder={'请输入校区位置'} />
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
export default List;
