import React from 'react';
import '../css/Data.css';
import {BestSalesTable} from "../components/book/BestSalesTable";
import {BackTop, Layout} from "antd";
import {HeadInfo} from "../components/layout/HeadInfo";
import {SideBar} from "../components/layout/SideBar";

const { Header, Content} = Layout;
class BestSalesView extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <HeadInfo/>
                </Header>
                <Layout>
                    <SideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <BestSalesTable/>
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

export default BestSalesView;
