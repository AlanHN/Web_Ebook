import React from 'react';
import {Layout,BackTop} from 'antd'
import {HeadInfo} from "../components/layout/HeadInfo";
import {SideBar} from "../components/layout/SideBar";
import {OrderList} from "../components/order/OrderList";

const { Header, Content} = Layout;
class OrderView extends React.Component {

    render()    {
            return(
                <Layout className="layout">
                    <Header>
                        <HeadInfo/>
                    </Header>
                    <Layout>
                        <SideBar />
                        <Content style={{ padding: '0 50px' }}>
                            <div className="home-content">
                                <OrderList />
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
export default OrderView;
