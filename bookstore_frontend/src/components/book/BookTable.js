import React from 'react';
import {Upload, message, Table, Drawer, Input, Col, Row, Button, Form} from 'antd';
import {Link} from "react-router-dom";
import Highlighter from 'react-highlight-words';
import {SearchOutlined, UploadOutlined} from '@ant-design/icons';
import {getBooks, deleteBook, addBook, editBook} from "../../services/bookService";
import '../../css/bookTable.css'
import TextArea from "antd/lib/input/TextArea";

class BookTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            searchText: '',
            searchedColumn: '',
            addVisible: false,
            editVisible: false,

            bookId: '',
            title: '',
            author: '',
            image: '',
            isbn: '',
            stock: '',
            price: '',
            description: '',
            upImage: ''
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            message.error("请登录");
        } else if (user.userType !== 0) {
            message.error("你没有权限");
        } else {
            const callback = (data) => {
                this.setState({dataSource: data});
            };
            getBooks({"search": null}, callback);
        }
    }

    showAddDrawer = () => {
        this.setState({
            addVisible: true,
        });
    };

    closeAddDrawer = () => {
        this.setState({
            addVisible: false,
        });
    };

    // search
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),

        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,

        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),

        onFilterDropdownVisibleChange: visiable => {
            if (visiable) {
                setTimeout(() => this.searchInput.select());
            }
        },

        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    showEditDrawer = () => {
        this.setState({
            editVisible: true,
        });
    };
    closeEditDrawer = () => {
        this.setState({
            editVisible: false,
        });
    };

    handleEdit = (bookId, title, author, image, isbn, price, stock, description) => {
        this.setState(
            {
                bookId: bookId,
                title: title,
                author: author,
                image: image,
                isbn: isbn,
                stock: stock,
                description: description,
                price: price
            }
        )
        this.showEditDrawer();
    };

    handleDelete = () => {
        const callback = (data) => {
            if (data.status >= 0) {
                message.success(data.msg);
                this.closeEditDrawer();

                const dataSource = [...this.state.dataSource];
                this.setState({
                    dataSource: dataSource.filter(item => item.bookId !== this.state.bookId),
                });

                const callback = (data) => {
                    this.setState({dataSource: data});
                };
                getBooks({"search": null}, callback);

            } else {
                message.error(data.msg);
            }
        };
        deleteBook(this.state.bookId, callback);
    };

    handleAdd = () => {
        console.log('addBook')
        const callback = () => {
            this.setState({
                    bookId: '',
                    title: '',
                    author: '',
                    image: '',
                    isbn: '',
                    stock: '',
                    description: ''
                }
            )
            this.closeAddDrawer();
            message.success("添加成功！");

            const callback1 = (data) => {
                this.setState({dataSource: data});
            };
            getBooks({"search": null}, callback1);
        };

        let json = {
            title: this.state.title,
            author: this.state.author,
            image: this.state.image,
            isbn: this.state.isbn,
            price: this.state.price,
            stock: this.state.stock,
            description: this.state.description
        };
        addBook(json, callback)
    }

    handleSubmit = () => {
        console.log('editBook')
        const callback = () => {
            this.setState({
                    bookId: '',
                    title: '',
                    author: '',
                    image: '',
                    isbn: '',
                    stock: '',
                    description: ''
                }
            )
            message.success("修改成功！");
            this.closeEditDrawer();
            const callback1 = (data) => {
                this.setState({dataSource: data});
            };
            getBooks({"search": null}, callback1);

        };
        let json = {
            bookId: this.state.bookId,
            title: this.state.title,
            author: this.state.author,
            image: this.state.image,
            isbn: this.state.isbn,
            stock: this.state.stock,
            price: this.state.price,
            description: this.state.description
        };
        console.log(json);
        editBook(json, callback)
    }

    customRequest = (option) => {
        const formData = new FormData();
        formData.append("files[]", option.file);
        const reader = new FileReader();
        reader.readAsDataURL(option.file);
        reader.onloadend = (e) => {
            this.setState({image: e.target.result})
            console.log(this.state.image);
            if (e && e.target && e.target.result) {
                option.onSuccess();
            }
        };
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("只能上传JPG或PNG文件!");
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("图片大小需小于2MB!");
            return false;
        }
        return isJpgOrPng && isLt2M;
    }

    render() {
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                ...this.getColumnSearchProps('title'),
                sorter: (a, b) => a.title.length - b.title.length,
            },
            {
                title: 'author',
                dataIndex: 'author',
                ...this.getColumnSearchProps('author'),
                sorter: (a, b) => a.author.length - b.author.length,
            },
            {
                title: 'image',
                dataIndex: 'image',
                render: (text) =>
                    (<img alt={'book face'} src={text} height={40} width={40}/>)
            },
            {
                title: 'isbn',
                dataIndex: 'isbn',
                ...this.getColumnSearchProps('isbn'),
                sorter: (a, b) => a.isbn - b.isbn,
            },
            {
                title: 'price',
                dataIndex: 'price',
                ...this.getColumnSearchProps('price'),
                sorter: (a, b) => a.price - b.price,
            },
            {
                title: 'stock',
                dataIndex: 'stock',
                ...this.getColumnSearchProps('stock'),
                sorter: (a, b) => a.stock - b.stock,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    this.state.dataSource.length >= 1 ? (
                        <Button
                            onClick={() => {
                                this.handleEdit(record.bookId, record.title, record.author, record.image, record.isbn, record.price, record.stock, record.description)
                            }}>Edit
                        </Button>
                    ) : null
                )
            },
        ];
        const {dataSource} = this.state;

        return (
            <div>
                <Link to='/'>
                    <Button>Home</Button>
                </Link>
                <Button onClick={this.showAddDrawer}>Add a book</Button>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />

                {/*Add*/}
                <Drawer
                    title="ADD A NEW BOOK"
                    width={720}
                    onClose={this.closeAddDrawer}
                    visible={this.state.addVisible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.closeAddDrawer} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button type={"primary"} onClick={this.handleAdd} htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="title"
                                    label="title"
                                    rules={[{required: true, message: 'Please enter title'}]}
                                >
                                    <Input placeholder="Please enter title"
                                           onChange={(e) => this.setState({title: e.target.value})}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="author"
                                    label="author"
                                    rules={[{required: true, message: 'Please enter author'}]}
                                >
                                    <Input placeholder="Please enter author"
                                           onChange={(e) => this.setState({author: e.target.value})}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="isbn"
                                    label="isbn"
                                    rules={[{required: true, message: 'Please enter isbn'}]}
                                >
                                    <Input placeholder="Please enter isbn"
                                           onChange={(e) => this.setState({isbn: e.target.value})}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="stock"
                                    label="stock"
                                    rules={[{required: true, message: 'Please enter stock'}]}
                                >
                                    <Input placeholder="Please enter stock"
                                           onChange={(e) => this.setState({stock: e.target.value})}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label="price"
                                    rules={[{required: true, message: 'Please enter price'}]}
                                >
                                    <Input placeholder="Please enter price"
                                           onChange={(e) => this.setState({price: e.target.value})}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="description"
                                    rules={[{required: true, message: 'Please enter description'}]}
                                >
                                    <TextArea rows={4} placeholder="Please enter description"
                                              onChange={(e) => this.setState({description: e.target.value})}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="image"
                                    label="image"
                                    rules={[{required: true, message: 'Please choose a image'}]}
                                >
                                    <Upload
                                        customRequest={this.customRequest}
                                        showUploadList={false}
                                        beforeUpload={this.beforeUpload}
                                    >
                                        <Button>
                                            <UploadOutlined/> Click to Upload
                                        </Button>
                                        <br/>
                                        {(this.state.image !== '') ?
                                            (
                                                <img alt={'new face'} src={this.state.image} height={100} width={100}/>
                                            ) :
                                            null
                                        }
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>

                {/*Edit Drawer*/}
                <Drawer
                    title={"EDIT BOOK"}
                    width={720}
                    onClose={this.closeEditDrawer}
                    visible={this.state.editVisible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button danger onClick={this.handleDelete} style={{marginRight: 8}}>
                                Delete
                            </Button>
                            <Button onClick={this.handleSubmit} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="title"
                                    label="title"
                                    rules={[{required: true, message: 'Please enter title'}]}
                                >
                                    <Input placeholder="Please enter title"
                                           onChange={(e) => this.setState({title: e.target.value})}
                                           defaultValue={this.state.title}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="author"
                                    label="author"
                                    rules={[{required: true, message: 'Please enter author'}]}
                                >
                                    <Input placeholder="Please enter author"
                                           onChange={(e) => this.setState({author: e.target.value})}
                                           defaultValue={this.state.author}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="isbn"
                                    label="isbn"
                                    rules={[{required: true, message: 'Please enter isbn'}]}
                                >
                                    <Input placeholder="Please enter isbn"
                                           onChange={(e) => this.setState({isbn: e.target.value})}
                                           defaultValue={this.state.isbn}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="stock"
                                    label="stock"
                                    rules={[{required: true, message: 'Please enter stock'}]}
                                >
                                    <Input placeholder="Please enter stock"
                                           onChange={(e) => this.setState({stock: e.target.value})}
                                           defaultValue={this.state.stock}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label="price"
                                    rules={[{required: true, message: 'Please enter price'}]}
                                >
                                    <Input placeholder="Please enter price"
                                           onChange={(e) => this.setState({price: e.target.value})}
                                           defaultValue={this.state.price}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="description"
                                    rules={[{required: true, message: 'Please enter description'}]}
                                >
                                    <Input rows={4} placeholder="Please enter description"
                                           onChange={(e) => this.setState({description: e.target.value})}
                                           defaultValue={this.state.description}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="image"
                                    label="image"
                                    rules={[{required: true, message: 'Please choose a image'}]}
                                >
                                    <Upload
                                        customRequest={this.customRequest}
                                        showUploadList={false}
                                        beforeUpload={this.beforeUpload}
                                    >
                                        <Button>
                                            <UploadOutlined/> Click to Upload
                                        </Button>
                                        <br/>
                                        {(this.state.image !== '') ?
                                            (
                                                <img alt={'new face'} src={this.state.image} height={100} width={100}/>
                                            ) :
                                            null
                                        }
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default BookTable;
