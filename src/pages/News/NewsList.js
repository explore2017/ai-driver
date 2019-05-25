import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  List,
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
const { TextArea } = Input;

@Form.create()
class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newsItem: [],
      typeList: [],
      visible: false,
      type:1
    };
  }

  componentDidMount() {
    const typeId = this.props.match.params.type;
    this.init(typeId);
  }

  init(typeId){
    this.setState({
      type:typeId
    })
    this.initialList(typeId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.type !== nextProps.match.params.type){
      this.init(nextProps.match.params.type);
    }
}

  initialList(typeId) {
    request("http://localhost:8080/news/searchType?typeId="+typeId,{
      method:'get',
    }).then((res) => {
      if (res.status == 0) {
        this.setState({
          list: res.data
        })
      }
    }).catch(() => { });
  }

  newsShow(record){
    console.log(99999)
    console.log(record)
    this.setState({
      visible: true,
    });

    this.setState({
      newsItem:record
    });
    // this.props.form.setFieldsValue({
    //   id: record.id,
    //   title: record.title,
    //   content: record.content,
    //   info: record.info,
    //   typeId: record.typeId,
    // });
  }

  handleDelete(record) {
    // record.id
    let api = "http://localhost:8080/news/deleteNews/" + record.id
    request(api, {
      method: 'delete',
    }).then(res => {
      message.success(res.msg);
      this.initialList(this.state.type);
    }).catch(() => { });

  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        request("http://localhost:8080/news/reviseNews", {
          method: 'PUT',
          data: values,
        })
          .then(res => {
            if (res.status == '0') {
              message.success(res.msg);
              this.handleModalVisible();
              this.initialList(this.state.type);
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

    const {list, newsItem} = this.state
    console.log(list)

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },{
        title: '新闻类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '简介',
        dataIndex: 'info',
        key: 'info',
      },
      {
        title: '操作',
        key: 'operator',
        render: record => {
          return (
            <span>
              <a onClick={() => this.handleEdit(record.news)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="你确认删除吗?"
                onConfirm={() => this.handleDelete(record.news)}
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
          <Link to={'/info/publish'}>
            <Button type="primary" style={{ marginBottom: 20 }}>
              信息发布
            </Button>
          </Link>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <Card onClick={this.newsShow.bind(this,item)} title={item.title}>{item.info}</Card>
              </List.Item>
            )}
          />
        </Card>
        <Modal
          title={'新闻详情'}
          visible={this.state.visible}
          onCancel={() => this.handleModalVisible()}>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Card title={newsItem.title} bordered={false} style={{ width: 300 }}>
              <p>{newsItem.content}</p>
            </Card>
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default NewsList;
