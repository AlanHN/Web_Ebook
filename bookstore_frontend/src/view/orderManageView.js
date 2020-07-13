import React from 'react';
import {Layout} from 'antd'
import {HeadInfo} from "../components/layout/HeadInfo";
import {SideBar} from "../components/layout/SideBar";
import {OrderTable} from "../components/order/OrderTable";

const {Header, Content} = Layout;

class OrderManageView extends React.Component {

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <HeadInfo/>
                </Header>
                <Layout>
                    <SideBar key={2}/>
                    <Content style={{padding: '0 50px'}}>
                        <div className="home-content">
                            <OrderTable/>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default OrderManageView;
