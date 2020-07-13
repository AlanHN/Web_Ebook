import React from 'react';
import {Layout,BackTop} from 'antd'
import {HeadInfo} from "../components/layout/HeadInfo";
import {SideBar} from "../components/layout/SideBar";
import {BookCarousel} from "../components/book/BookCarousel";
import {BookList} from "../components/book/BookList";
import '../css/home.css'

const { Header, Content} = Layout;

class HomeView extends React.Component{
    render(){
        return(
            <Layout className="layout">
                <Header>
                    <HeadInfo/>
                </Header>
                <Layout>
                    <SideBar key={2}/>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <BookCarousel />
                            <BookList />
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                        <BackTop />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default HomeView;
