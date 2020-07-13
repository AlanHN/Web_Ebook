import React from 'react';
import {Router, Route, Switch,Redirect} from 'react-router-dom';
import {history} from "./utils/history";
import HomeView from "./view/homeView";
import LoginView from './view/loginView';
import RegisterView from "./view/registerView";
import BookView from "./view/bookView";
import UserManageView from "./view/userManageView";
import BookManageView from "./view/bookManageView";
import OrderManageView from "./view/orderManageView"
import CartView from "./view/cartView";
import OrderView from "./view/orderView";
import UserBuyView from "./view/userBuyView";
import BestSalesView from "./view/bestSalesView";
import BestCustomerView from "./view/bestCustomerView";

class BasicRoute extends React.Component {

    constructor(props) {
        super(props);
        history.listen((location, action) => {
            console.log(location, action);
        });
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path={"/"} component={HomeView}/>
                    <Route exact path={"/login"} component={LoginView}/>
                    <Route exact path={"/cart"} component={CartView}/>
                    <Route exact path={"/order"} component={OrderView}/>
                    <Route exact path={"/register"} component={RegisterView}/>
                    <Route exact path={"/book"} component={BookView}/>
                    <Route exact path={"/userManage"} component={UserManageView}/>
                    <Route exact path={"/bookManage"} component={BookManageView}/>
                    <Route exact path={"/orderManage"} component={OrderManageView}/>
                    <Route exact path={"/myBuys"} component={UserBuyView}/>
                    <Route exact path={"/bestSales"} component={BestSalesView}/>
                    <Route exact path={"/bestCustomer"} component={BestCustomerView}/>
                    <Redirect from="/*" to="/" />
                </Switch>
            </Router>
        );
    }
}

export default BasicRoute;
