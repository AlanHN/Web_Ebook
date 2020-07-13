import React from 'react';
import {List, Input} from 'antd'
import {Book} from './Book'
import {getBooks} from "../../services/bookService";

const {Search} = Input;

export class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            showBooks:[],
            searchValue:'',
        };
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({books: data,showBooks:data});
        };
        getBooks({"search": null}, callback);
    }

    searchChange = ({ target: { value } }) =>{
        this.setState({searchValue:value})
        let arr = [];
        let list = this.state.books;
        let search = value;

        for (let i = 0; i < list.length; i++) {
            if (list[i].title.indexOf(search) >= 0) {
                arr.push(list[i]);
            }
        }

        this.setState(
            {showBooks:arr}
        );
    }

    render() {
        return (
            <div>
                <Search value={this.state.searchValue}
                        placeholder="search for books"
                        onChange={this.searchChange}
                        enterButton
                        allowClear
                />
                <br/>
                <br/>
                <List
                    grid={{gutter: 10, column: 3}}
                    dataSource={this.state.showBooks}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 16,
                    }}

                    renderItem={item => (
                        <List.Item>
                            <Book info={item}/>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
