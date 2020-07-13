import React from 'react';
import {Layout} from 'antd'
import {SideBar} from "../components/layout/SideBar";
import {BookDetail} from "../components/book/BookDetail";
import HeadInfo from "../components/layout/HeadInfo";
import '../css/bookDetail.css'
import {getBook} from "../services/bookService";

const {Header, Content} = Layout;

class BookView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bookInfo:null};
    }

    componentDidMount() {

        //用于加入购物车等操作
        let user = localStorage.getItem("user");
        this.setState({user:user});

        //找到search字段
        const query = this.props.location.search;
        //分离
        const arr = query.split('&');
        //？id后面开始
        const bookId = arr[0].substr(4);

        getBook(bookId, (data) => {this.setState({bookInfo: data})})
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <HeadInfo/>
                </Header>
                <Layout>
                    <SideBar key={1}/>
                    <Content style={{padding: '0 50px'}}>
                        <div className="home-content">
                            <BookDetail info={this.state.bookInfo}/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default BookView;
