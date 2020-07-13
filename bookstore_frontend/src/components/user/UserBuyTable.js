import React from 'react';
import {Button, DatePicker, Input, message, Table} from 'antd'
import {getOrders} from "../../services/userService";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const { RangePicker } = DatePicker;

export class UserBuyTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            data: [],
            showData:[],
            searchText: '',
            searchedColumn: '',
            number:0,
            sum:0,
        };
    }

    componentDidMount() {
        const callback = (data) => {
            console.log(data);
            debugger;
            let number = new Array(40);
            let title = new Array(40);
            let sum = new Array(40);
            let arr =[];
            let sumCount=0;
            let numberCount=0;
            for(let index = 0;index < 40;index++){
               number[index] = 0;
               title[index] = '';
               sum[index] = 0;
            }
            debugger;
            for(let i = 0;i <=data.length-1;i++)
            {
                for(let j = 0;j<=data[i].items.length-1;j++)
                {
                    let item = data[i].items[j];
                    let book = item.book;
                    let bookId = book.bookId;
                    number[bookId] += item.bookNumber;
                    title[bookId]=book.title;
                    sum[bookId] += Number((item.bookNumber * item.bookPrice));
                }
            }
            for(let index = 0;index < 40;index++){
                if(number[index] !== 0)
                {
                    let json = {bookId:index,title:title[index],bookNumber:number[index],sum:sum[index].toFixed(1)};
                    sumCount+=sum[index];
                    numberCount+=number[index];
                    arr.push(json);
                }
            }
            this.setState({data: arr,showData:arr,orders:data,sum:sumCount,number:numberCount});
        };

        let user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            message.error("请登录");
        } else {
            let userId = user.userId;
            getOrders(userId, callback);
        }
    }

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

        onFilterDropdownVisibleChange: visible => {
            if (visible) {
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

    timeChange = (value, dateString) => {
        if(dateString[0]===''||dateString[1]==='')
        {
            this.setState({showData:this.state.data})
            return;
        }
        console.log('Formatted Selected Time: ', dateString);
        const startTime= new Date(Date.parse(dateString[0]));
        const endTime=new Date(Date.parse(dateString[1]));
        let data = this.state.orders;
        let number = new Array(40);
        let title = new Array(40);
        let sum = new Array(40);
        let arr =[];
        let sumCount=0;
        let numberCount=0;
        for(let index = 0;index < 40;index++){
            number[index] = 0;
            title[index] = '';
            sum[index] = 0;
        }
        for(let i = 0;i <=data.length-1;i++)
        {
            let time = new Date(Date.parse(data[i].time));
            if (
                time >=startTime && time<=endTime
            ) {
                for (let j = 0; j <= data[i].items.length - 1; j++) {
                    let item = data[i].items[j];
                    let book = item.book;
                    let bookId = book.bookId;
                    number[bookId]++;
                    title[bookId] = book.title;
                    sum[bookId] += Number((item.bookNumber * item.bookPrice));
                }
            }
        }
        for(let index = 0;index < 40;index++){
            if(number[index] !== 0)
            {
                let json = {bookId:index,title:title[index],bookNumber:number[index],sum:sum[index].toFixed(1)};
                sumCount+=sum[index];
                numberCount+=number[index]
                arr.push(json)
            }
        }
        this.setState({
            showData:arr,number:numberCount,sum:sumCount
        })
    }

    render() {
        const columns = [
            {
                title: 'Tilte',
                dataIndex: 'title',
                key: 'title',
                ...this.getColumnSearchProps('title'),
            },
            {
                title: 'Number',
                dataIndex: 'bookNumber',
                key: 'bookNumber',
                sorter: (a, b) => a.bookNumber - b.bookNumber,
            },
            {
                title: 'Sum',
                dataIndex: 'sum',
                key: 'sum',
                sorter: (a, b) => a.sum - b.sum,
            },
        ];

        return (
            <div>
                <br/>
                <br/>
                <RangePicker onChange ={this.timeChange}/>
                <Table bordered columns={columns} dataSource={this.state.showData} />
                <div style={{marginBottom: 16}}>
                    <span style={{marginLeft: 8}}>
                        All books you've buy: {this.state.number}
                    </span>
                </div>
                <div>
                    <span style={{marginLeft: 10}}>
                        All sum you've consume: {this.state.sum.toFixed(1)}
                    </span>
                </div>
            </div>

        );
    }
}
