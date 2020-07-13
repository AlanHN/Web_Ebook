import React from 'react';
import '../css/Data.css';
import {Layout} from "antd";
import {HeadInfo} from "../components/layout/HeadInfo";
import {SideBar} from "../components/layout/SideBar";
import {CartList} from "../components/cart/CartList";

const { Header, Content} = Layout;

class CartView extends React.Component {
    render()    {
        return(
            <Layout className="layout">
                <Header>
                    <HeadInfo/>
                </Header>
                <Layout>
                    <SideBar key={2}/>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <CartList />
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default CartView;
